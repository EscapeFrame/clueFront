# 퀴즈 배틀 시스템 테스트 가이드

## 🎮 테스트 경로

### 1. **선생님 - 퀴즈 방 만들기**
```
경로: /quiz
또는: /quiz?documentId=YOUR_DOCUMENT_ID&classRoomId=YOUR_CLASSROOM_ID
```

**기능:**
- 퀴즈 제목 입력
- 보너스 게임 토글
- WebSocket으로 방 생성
- documentId 포함 시 RAG 기반 문제 자동 생성

**플로우:**
1. 퀴즈 생성 화면
2. 대기실 (참가자 대기)
3. 문제 출제
4. 랭킹 확인
5. 최종 결과

### 2. **학생 - 퀴즈 참여**
```
경로: /quiz
```

**기능:**
- 캐릭터 선택
- 방 코드 입력
- 퀴즈 참여
- 실시간 문제 풀이
- 결과 확인

### 3. **REST API 테스트**
```
경로: /quiz-api-test
```

**기능:**
- 활성 퀴즈 방 목록 조회
- 방 상세 정보 확인
- 호스트별 필터링
- 클래스룸별 필터링

## 🔧 해결된 에러

### TypeScript 타입 에러
✅ WebSocket 구독 메시지 타입 (`unknown` → 명시적 타입 캐스팅)
✅ Participant 타입 확장 (score, correctAnswers 등)
✅ Question 타입 확장 (correctAnswer 추가)
✅ 컴포넌트 간 타입 불일치 해결

### URL 파라미터 연동
✅ `useSearchParams`로 documentId, classRoomId 가져오기
✅ 방 생성 시 서버로 전달

## 📝 테스트 시나리오

### Scenario 1: 기본 퀴즈 (일반 주제)
```bash
1. 선생님: /quiz 접속
2. 퀴즈 제목 입력 (예: "일반 상식 퀴즈")
3. "퀴즈 생성" 클릭
4. 방 코드 확인 (예: ABC123)
5. 학생: /quiz 접속
6. 방 코드 입력 후 참여
7. 선생님: "시작하기" 버튼 클릭
8. 게임 진행...
```

### Scenario 2: 문서 기반 퀴즈 (RAG)
```bash
1. 선생님: /quiz?documentId=550e8400-e29b-41d4-a716-446655440000
2. 퀴즈 제목 입력
3. "퀴즈 생성" 클릭
4. FastAPI가 해당 문서 기반으로 문제 자동 생성
5. 나머지는 Scenario 1과 동일
```

### Scenario 3: API 테스트
```bash
1. /quiz-api-test 접속
2. 활성 방 목록 확인
3. 방 코드 클릭하여 상세 정보 확인
4. 호스트 ID로 필터링 테스트
5. 클래스룸 ID로 필터링 테스트
```

## 🐛 알려진 제한사항

1. **컴포넌트 타입 불일치**
   - QuizPlaying, QuizResult 컴포넌트가 기대하는 Question 타입과 서버에서 받는 타입이 다름
   - 현재는 타입 캐스팅으로 임시 해결
   - 향후 통합 타입 정의 필요

2. **캐릭터 정보**
   - 현재는 기본값 "panda" 사용
   - 실제 참가자의 캐릭터 선택 정보가 서버에서 전달되어야 함

3. **답변 정보**
   - QuizResult 컴포넌트에 전달되는 answers 정보가 빈 객체
   - 실제 답변 정보를 별도로 관리하고 전달 필요

## 🔗 WebSocket 엔드포인트

### 클라이언트 → 서버
- `/app/quiz/create` - 방 생성
- `/app/quiz/join/{roomCode}` - 방 참여
- `/app/quiz/start/{roomCode}` - 퀴즈 시작
- `/app/quiz/answer/{roomCode}` - 답변 제출
- `/app/quiz/next/{roomCode}` - 다음 문제

### 서버 → 클라이언트
- `/topic/quiz/rooms` - 방 생성 알림
- `/topic/quiz/{roomCode}/participants` - 참가자 업데이트
- `/topic/quiz/{roomCode}/game` - 게임 진행
- `/topic/quiz/{roomCode}/rankings` - 랭킹 업데이트
- `/queue/quiz/result` - 개인 답변 결과

## 🎯 다음 단계

1. [ ] 컴포넌트 타입 통합
2. [ ] 캐릭터 선택 정보 서버 연동
3. [ ] 답변 정보 추적 및 관리
4. [ ] 에러 핸들링 강화
5. [ ] 로딩 상태 추가
6. [ ] 재연결 로직 추가

## 💡 빠른 테스트

```typescript
// 브라우저 콘솔에서 테스트
// 1. 선생님 탭
window.location.href = '/quiz?documentId=test-doc-id';

// 2. 학생 탭 (새 탭)
window.location.href = '/quiz';

// 3. API 테스트
window.location.href = '/quiz-api-test';
```
