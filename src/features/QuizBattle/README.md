# Quiz Battle 기능

실시간 WebSocket 기반 퀴즈 배틀 시스템입니다.

## 📁 프로젝트 구조

```
QuizBattle/
├── components/
│   ├── CreateRoom.tsx      # 방 생성 컴포넌트
│   ├── QuizBattleRoom.tsx  # 퀴즈 게임 진행 컴포넌트
│   ├── RoomList.tsx        # 방 목록 및 참가 컴포넌트
│   └── styles.ts           # 공통 스타일
├── services/
│   └── QuizBattleService.ts # WebSocket 통신 관리
├── types/
│   └── index.ts            # TypeScript 타입 정의
├── index.tsx               # 메인 컴포넌트
└── README.md
```

## 🚀 기능

### 1. 방 생성 (CreateRoom)
- 최대 참가자 수 설정 (2-50명)
- 문제 수 설정 (5-50문제)
- 문제당 시간 설정 (10-300초)
- 교실 ID, 문서 ID 연결 (선택사항)

### 2. 방 참가 (RoomList)
- 방 코드를 통한 직접 참가
- 새 방 만들기 버튼

### 3. 게임 진행 (QuizBattleRoom)
- **대기 상태**: 참가자 목록 확인, 호스트가 게임 시작
- **게임 진행**:
  - 실시간 문제 표시
  - 카운트다운 타이머
  - 답변 제출 및 즉시 피드백
  - 점수 획득 표시
- **게임 종료**:
  - 최종 순위 표시 (금/은/동메달 효과)
  - 정답률 및 점수 확인

### 4. 실시간 기능
- 참가자 입장/퇴장 실시간 업데이트
- 답변 결과 즉시 피드백
- 현재 순위 조회
- 호스트의 게임 진행 제어

## 🔧 WebSocket 엔드포인트

### 연결
- **URL**: `${VITE_API_BASE_URL}/ws-quiz`
- **프로토콜**: SockJS + STOMP
- **인증**: JWT Bearer Token (Authorization 헤더)

### 구독 (Subscribe)
- `/topic/quiz/rooms` - 방 생성 알림
- `/topic/quiz/{roomCode}/participants` - 참가자 업데이트
- `/topic/quiz/{roomCode}/game` - 게임 이벤트
- `/topic/quiz/{roomCode}/rankings` - 순위 정보
- `/user/queue/quiz/result` - 개인 답변 결과
- `/user/queue/errors` - 에러 메시지

### 발행 (Publish)
- `/app/quiz/create` - 방 생성
- `/app/quiz/join/{roomCode}` - 방 참가
- `/app/quiz/start/{roomCode}` - 퀴즈 시작 (호스트)
- `/app/quiz/answer/{roomCode}` - 답변 제출
- `/app/quiz/next/{roomCode}` - 다음 문제 (호스트)
- `/app/quiz/rankings/{roomCode}` - 순위 조회
- `/app/quiz/leave/{roomCode}` - 방 나가기
- `/app/quiz/cancel/{roomCode}` - 방 취소 (호스트)

## 📝 사용 방법

### 1. 라우팅 접근
- **교사**: `/quiz-battle`
- **학생**: `/quiz-battle`

### 2. 방 생성 플로우
1. "새 방 만들기" 클릭
2. 방 설정 입력 (참가자 수, 문제 수, 시간 등)
3. "방 만들기" 클릭
4. 자동으로 방 화면으로 이동 (호스트로)

### 3. 방 참가 플로우
1. 방 코드 입력
2. "참가하기" 클릭
3. 자동으로 방 화면으로 이동

### 4. 게임 진행 플로우
1. 호스트가 "퀴즈 시작" 클릭
2. 모든 참가자에게 문제 표시
3. 참가자들이 답변 선택
4. 정답/오답 및 점수 즉시 표시
5. 호스트가 "다음 문제" 클릭
6. 3-5 반복
7. 모든 문제 종료 후 최종 순위 표시

## 🎨 스타일링

Emotion (CSS-in-JS)을 사용하여 구현되었습니다.

### 주요 디자인 특징
- 반응형 디자인
- 그라디언트 배경 (헤더, 순위)
- 호버 효과 및 애니메이션
- 메달 이펙트 (1-3위)
- 경고 시 타이머 애니메이션

## 🔐 인증

JWT 토큰을 사용하여 WebSocket 연결 시 인증합니다.
- Props로 전달되거나
- `localStorage`의 `accessToken` 키에서 자동 조회
- Authorization 헤더에 `Bearer {token}` 형식으로 전달

## ⚙️ 환경 설정

### 환경 변수 (.env)

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# API Base URL
VITE_API_BASE_URL=http://localhost:8080

# 또는 프로덕션 환경
# VITE_API_BASE_URL=http://paletto.site:8080
```

`.env.example` 파일을 참고하세요.

## 🔌 백엔드 연동

백엔드 구현이 필요합니다. 자세한 내용은 `BACKEND_GUIDE.md`를 참고하세요.

### 필수 백엔드 요구사항
- Spring Boot WebSocket & STOMP 지원
- JWT 인증 구현
- `/ws-quiz` SockJS 엔드포인트
- 모든 메시지 핸들러 구현

## 📦 의존성

이미 `package.json`에 설치되어 있음:
- `@stomp/stompjs` - STOMP 프로토콜
- `sockjs-client` - SockJS 클라이언트
- `@emotion/styled` - 스타일링
- `react-router-dom` - 라우팅

## 🐛 에러 핸들링

- WebSocket 연결 실패 시 알림
- 구독 에러 처리
- 방 참가 실패 처리
- 게임 중 에러 표시

## 🔄 생명주기

```typescript
// 컴포넌트 마운트
1. WebSocket 연결
2. 방 참가 또는 생성
3. 이벤트 구독

// 컴포넌트 언마운트
1. 방 나가기 요청
2. 모든 구독 해제
3. WebSocket 연결 종료
```

## 📱 향후 개선 가능 사항

- [ ] 활성 방 목록 표시
- [ ] 방 검색 및 필터
- [ ] 채팅 기능
- [ ] 프로필 이미지
- [ ] 게임 통계 및 기록
- [ ] 다양한 게임 모드
- [ ] 관전 모드
- [ ] 리플레이 기능

## 🤝 기여

버그 리포트나 기능 제안은 이슈로 등록해주세요.
