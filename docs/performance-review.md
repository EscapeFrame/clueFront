# Paletto 성능 최적화 코드 리뷰

> 작성일: 2026-04-12
> 리뷰 범위: 전체 코드베이스 (`src/`) — 성능 최적화 관점

---

## 개요

코드 품질 개선이 아닌 **속도 최적화** 관점으로 전체 코드베이스를 리뷰했다.
발견된 문제들은 아래 3가지 카테고리로 분류된다:

1. **번들 크기** — 초기 로딩 속도에 직접 영향
2. **메모리 누수** — 장시간 사용 시 성능 저하
3. **렌더링 최적화** — 인터랙션 응답 속도

총 **6개의 GitHub 이슈**로 작업 단위를 분리했다.

---

## 1. 번들 크기 최적화

### 1-1. 라우트 Lazy Loading 미적용 — EscapeFrame/clueFront#606

**파일:** `src/app/router/AppRoutes.tsx` (lines 1–33)

20개 이상의 페이지 컴포넌트가 모두 정적 `import`로 선언되어 있어 첫 로딩 시 전부 다운로드된다.

```ts
// 현재: 모든 페이지가 초기 번들에 포함
import STUHome from '../pages/Student/Main';
import QuizBattle from '../pages/QuizBattle';  // QuizBattleService 415줄 포함
// ...20개+

// 개선: React.lazy + Suspense
const STUHome = React.lazy(() => import('../pages/Student/Main'));
```

고우선 lazy-load 대상:

| 페이지 | 이유 |
|--------|------|
| `QuizBattle` | `QuizBattleService.ts`(415줄) + `QuizBattleRoom.tsx`(403줄) |
| `TCHMarkDown` / `MarkDownViewerPage` | `@uiw/react-md-editor` ~400KB+ |
| `MakeClassMaterials` / `GenerateProblem` | AI agent 플로우 전체 |
| `STUQuiz` / `TCHQuiz` | STOMP/SockJS WebSocket 전체 |

**기대 효과:** 초기 번들 30–40% 감소

---

### 1-2. `vite.config.ts` 청킹 비활성화 — EscapeFrame/clueFront#606

**파일:** `vite.config.ts` (line 15)

```ts
// 현재: 청킹 명시적 비활성화
manualChunks: undefined,

// 개선
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  recoil: ['recoil'],
  query: ['@tanstack/react-query'],
  emotion: ['@emotion/react', '@emotion/styled'],
  stomp: ['@stomp/stompjs', 'sockjs-client'],
},
minify: 'terser',
terserOptions: { compress: { drop_console: true } },  // 프로덕션 console.log 제거
```

---

### 1-3. 미사용 패키지 번들 포함 — EscapeFrame/clueFront#610

`package.json`에 선언되었지만 `src/` 어디에서도 import되지 않는 패키지들:

| 패키지 | 크기 | 비고 |
|--------|------|------|
| `@stylexjs/stylex` | ~240KB | Emotion만 사용 중, StyleX import 0건 |
| `bootstrap` + `react-bootstrap` | ~30KB+ | src 전체 import 없음 |
| `body-parser`, `cors`, `express` | — | 서버 패키지, 프론트엔드 불필요 |
| `jspdf` + `html2canvas` | ~500KB | `AddTimeLine` 라우트가 주석 처리됨 |

추가로 type-only import 미적용:
- `src/linkSave/entities/Header/index.tsx` line 5: `import { IconType } from 'react-icons'` → `import type`으로 변경 필요
- `src/features/Common/Class/TabSelector/index.tsx` line 4: 동일

---

### 1-4. 에셋 최적화 — EscapeFrame/clueFront#610

`public/` 디렉토리의 미최적화 이미지:

| 파일 | 크기 | 문제 |
|------|------|------|
| `NotFound.png` | **7.6MB** | 404 페이지 접근마다 전송. 즉시 교체 필요 |
| `sample.jpg` | 246KB | Navbar 기본 프로필 이미지 — 전 인증 페이지 로드 |
| `registerImg.png` | 96KB | 로그인/회원가입 첫 화면 (콜드 방문자 크리티컬 패스) |

이미지를 `public/` 대신 `src/assets/`로 이동해야 Vite가 content hash + 최적화 처리를 적용한다.

---

## 2. 메모리 누수

### 2-1. Blob URL cleanup 미구현 — EscapeFrame/clueFront#607

**파일:** `src/pages/Signup/index.tsx`, `src/entities/Setting/UI/UserSection.tsx`

```tsx
// 현재 (Signup): 렌더링마다 새 blob URL 생성, 이전 URL 해제 안 함
{selectedImage && (
  <img src={URL.createObjectURL(selectedImage)} alt="Profile Preview" />
)}

// 현재 (UserSection): 이미지 변경마다 이전 URL 미해제
setImage(URL.createObjectURL(file));

// 개선: useEffect cleanup 또는 상태 변경 시 revoke
useEffect(() => {
  if (!selectedImage) return;
  const url = URL.createObjectURL(selectedImage);
  setPreviewUrl(url);
  return () => URL.revokeObjectURL(url);  // cleanup
}, [selectedImage]);
```

---

### 2-2. WebSocket 구독 해제 미구현 — EscapeFrame/clueFront#607

**파일:** `src/features/QuizBattle/services/QuizBattleService.ts` (line 114–120)

```ts
// 현재: 구독 객체 참조만 초기화, 실제 unsubscribe 안 함
disconnect(): void {
  if (this.client) {
    this.client.deactivate();
    this.connected = false;
    this.subscriptions = {};  // ← unsubscribe 없이 참조만 제거
  }
}

// 개선
disconnect(): void {
  Object.values(this.subscriptions).forEach(sub => sub.unsubscribe());
  if (this.client) {
    this.client.deactivate();
    this.connected = false;
    this.subscriptions = {};
  }
}
```

참고: `useQuizSocket.ts`의 cleanup은 올바르게 구현되어 있음 (`sub.unsubscribe()` + `client.deactivate()`)

---

### 2-3. localStorage 반복 접근 — EscapeFrame/clueFront#607

**파일:** `src/shared/config/api.ts` (line 26), `src/app/hooks/useQuizSocket.ts` (6+ 곳)

localStorage는 동기 I/O로 메인 스레드를 블로킹한다. 현재 매 API 요청마다 `localStorage.getItem('accessToken')` 호출.

```ts
// 현재: 매 요청마다 localStorage 읽기
Customapi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');  // 매 요청 블로킹
  ...
});

// 개선: 모듈 레벨 메모리 캐싱
let cachedToken: string | null = localStorage.getItem('accessToken');

export const updateCachedToken = (token: string | null) => {
  cachedToken = token;
};

Customapi.interceptors.request.use((config) => {
  if (cachedToken) config.headers.Authorization = `Bearer ${cachedToken}`;
  ...
});
```

---

## 3. 렌더링 최적화

### 3-1. 전역 컴포넌트 메모이제이션 미적용 — EscapeFrame/clueFront#608

**파일:** `src/widgets/Navbar/index.tsx`, `src/widgets/UserMenu/index.tsx`, `src/widgets/Footer/index.tsx`

세 컴포넌트 모두 `React.memo` 미적용으로 부모 리렌더링(매 페이지 이동)마다 불필요하게 재렌더링됨.

#### Navbar (98줄) — 매 페이지 이동마다 재렌더링
`useLocation()` 의존으로 라우트 변경마다 리렌더링. 내부 함수 4개(`Main`, `LinkSave`, `handleLinkSaveClick`, navigate 핸들러) 모두 `useCallback` 미적용.

#### UserMenu (110줄) — 6개 핸들러 + 5개 인라인 onClick 미최적화
```
setting()         line 40  → useCallback 필요
question()        line 44  → useCallback 필요
handleLogout()    line 48  → useCallback 필요 (async)
onClick 인라인    line 70, 91, 98, 99, 103  → useCallback 필요
```

#### Footer (29줄) — props 없는 순수 컴포넌트
`React.memo` 한 줄만 추가하면 됨.

---

### 3-2. Lesson/index.tsx 대규모 최적화 필요 — EscapeFrame/clueFront#609

**파일:** `src/features/Common/Class/Lesson/index.tsx` (535줄)

| 항목 | 개수 | 문제 |
|------|------|------|
| `useCallback` 미적용 함수 | **15개** | 토글/드래그/클릭마다 전체 재생성 |
| 인라인 객체 리터럴 props | 7곳 | 매 렌더마다 새 참조 |
| 반복 계산 (`filter/length`) | 3줄 (라인 416–420) | `useMemo` 없이 매 렌더 실행 |
| 서브컴포넌트 미분리 | SubItem, DirectoryItem | `React.memo` 적용 불가 |

15개 함수 중 우선 적용 대상:

```ts
// 토글 (매 클릭마다 실행)
toggleDirectory    → useCallback([expandedIds])
handleDirectoryClick → useCallback([expandedIds, navigate, classRoomId])

// 입력 (매 키스트로크마다 실행)
handleTitleChange  → useCallback([directories])
handleTitleBlur    → useCallback([editingDocId, directories, visibilityMap])

// 드래그
handleDropToDir    → useCallback([directories, visibilityMap])
toggleVisibility   → useCallback([visibilityMap, directories])
```

**기대 효과:** 토글/드래그 시 렌더링 60–70% 단축

---

### 3-3. QuizBattleRoom 타이머 기반 재렌더링 — EscapeFrame/clueFront#611

**파일:** `src/features/QuizBattle/components/QuizBattleRoom.tsx` (403줄)

타이머가 매초 업데이트되어 선택지 렌더링이 매초 반복된다.

```tsx
// 현재: 매초 새 함수 4개 생성
{currentQuestion.options.map((option, idx) => (
  <OptionButton
    key={idx}                                        // ← 비안정 key
    onClick={() => handleSubmitAnswer(idx)}          // ← 매초 새 함수
    correct={answerResult?.isCorrect && idx === selectedAnswer}  // ← 매번 재계산
    incorrect={!answerResult?.isCorrect && idx === selectedAnswer}
  >
))}

// 개선
const optionHandlers = useMemo(() =>
  currentQuestion.options.map((_, idx) => () => handleSubmitAnswer(idx)),
  [currentQuestion, handleSubmitAnswer]
);
```

추가로 `key={idx}` → `key={p.userId}` 등 안정적 key로 교체 필요 (라인 261, 304, 367, 389).

---

### 3-4. Notice/PendingTask 정렬 매 렌더링 반복 — EscapeFrame/clueFront#611

**Notice** (`src/features/Common/Main/Notice/index.tsx`, 라인 28–32):
```ts
// 현재: 모달 열기/닫기마다 3번 정렬 실행
const sortedService = [...(serviceNotices || [])].sort(sortDesc);
const sortedSchool = [...(schoolNotices || [])].sort(sortDesc);
const sortedSchedule = [...(scheduleNotices || [])].sort(sortDesc);

// 개선
const { sortedService, sortedSchool, sortedSchedule } = useMemo(() => ({
  sortedService: [...(serviceNotices || [])].sort(sortDesc),
  sortedSchool: [...(schoolNotices || [])].sort(sortDesc),
  sortedSchedule: [...(scheduleNotices || [])].sort(sortDesc),
}), [serviceNotices, schoolNotices, scheduleNotices]);
```

**PendingTask** (`src/features/Common/Main/PendingTask/index.tsx`, 라인 52–74):
JSX 내 IIFE 패턴으로 map → filter → filter → sort → map 체인이 매 렌더링 실행.
`useMemo`로 추출하고 `today`도 `useMemo(() => dayjs(), [])`로 1회만 생성.

---

### 3-5. React Query `staleTime` 미설정

**파일:** `src/entities/Quiz/hooks/useQuizRoom.ts` (lines 28–83)

5개 쿼리 모두 `staleTime` 미설정 → 윈도우 포커스마다 불필요한 재요청.
`src/features/Common/Main/hooks/useClass.ts`처럼 `staleTime: SIX_HOURS_IN_MS` 패턴 적용.

---

### 3-6. useQuizSocket.ts 이중 렌더링

**파일:** `src/app/hooks/useQuizSocket.ts` (line 130)

WebSocket 연결 시 `setConnecting(false)`와 `forceUpdate(prev => prev + 1)`이 연달아 호출되어 불필요한 두 번째 렌더 발생. `forceUpdate` 제거로 해결.

---

## 4. 코드 패턴 이슈 (성능과 연관)

### 4-1. raw `fetch()` 사용으로 인터셉터 우회

**파일:** `src/pages/Student/Quiz/index.tsx` (lines 231, 252), `src/features/Common/Class/Lesson/index.tsx` (line 273)

`Customapi` 대신 raw `fetch()`를 사용해 토큰 갱신 인터셉터를 우회. 토큰 만료 시 자동 재발급 없이 요청 실패.

### 4-2. 양호한 부분

- `useQuizSocket.ts` WebSocket cleanup: `sub.unsubscribe()` + `client.deactivate()` 정상 구현 ✅
- `useCurrentPeriod.ts` setInterval cleanup: `clearInterval` 정상 구현 ✅
- 대부분의 `URL.createObjectURL` 다운로드 용도 사용처: `revokeObjectURL` 정상 구현 ✅
- react-icons 아이콘 서브패키지 import 패턴 (`react-icons/io5` 등): 트리쉐이킹 정상 동작 ✅

---

## 5. 작업 이슈 목록

| 이슈 | 제목 | 우선순위 |
|------|------|---------|
| [#606](https://github.com/EscapeFrame/clueFront/issues/606) | 번들 크기 최적화: 라우트 lazy loading + vite.config 청킹 | 🔴 높음 |
| [#607](https://github.com/EscapeFrame/clueFront/issues/607) | 메모리 누수 수정: Blob URL / WebSocket 구독 / localStorage | 🔴 높음 |
| [#608](https://github.com/EscapeFrame/clueFront/issues/608) | 전역 컴포넌트 메모이제이션: Navbar / UserMenu / Footer | 🟡 중간 |
| [#609](https://github.com/EscapeFrame/clueFront/issues/609) | Lesson/index.tsx 렌더링 최적화 | 🟡 중간 |
| [#610](https://github.com/EscapeFrame/clueFront/issues/610) | 에셋 최적화 및 미사용 패키지 제거 | 🟡 중간 |
| [#611](https://github.com/EscapeFrame/clueFront/issues/611) | QuizBattleRoom + Notice/PendingTask useMemo | 🟢 낮음 |

---

## 6. 예상 성능 개선 효과

| 영역 | 현재 | 개선 후 |
|------|------|---------|
| 초기 번들 크기 | 단일 대형 청크 | 30–40% 감소 (lazy loading) |
| NotFound.png | 7.6MB | ~50KB 이하 |
| 전역 컴포넌트 렌더링 | 매 페이지 이동 | 불필요한 재렌더 스킵 |
| Lesson 토글/드래그 | 전체 535줄 재렌더 | 변경 아이템만 재렌더 (60–70% ↓) |
| 퀴즈 선택지 | 매초 4개 함수 생성 | 메모이제이션으로 스킵 |
| 메모리 (장시간 사용) | Blob URL + WS 구독 누적 | 누수 방지 |

---

## 7. 검증 방법

1. **번들**: `npm run build` 전후 `dist/` 크기 비교
2. **Lighthouse**: FCP, LCP, TTI 점수 측정 (특히 초기 로딩)
3. **React DevTools Profiler**: Lesson 페이지, 퀴즈 페이지 렌더 횟수 확인
4. **Chrome Memory 탭**: 이미지 업로드 반복 후 blob URL 누수 확인
5. **Network 탭**: 윈도우 포커스 이벤트 시 불필요한 API 재요청 여부 확인
