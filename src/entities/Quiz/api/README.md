# Quiz REST API Integration

퀴즈 관련 REST API를 연결하고 React Query를 사용하여 상태를 관리합니다.

## 📁 파일 구조

```
src/entities/Quiz/
├── api/
│   ├── quiz.api.ts        # REST API 함수들
│   └── index.ts           # Export 파일
├── hooks/
│   └── useQuizRoom.ts     # React Query 커스텀 훅들
├── Student/
│   └── ActiveQuizList.tsx # 활성 퀴즈 방 목록 컴포넌트
└── Teacher/
    └── QuizRoomDetail.tsx # 퀴즈 방 상세 정보 컴포넌트
```

## 🔌 API 엔드포인트

### 1. GET `/api/quiz/rooms/{roomCode}`
특정 퀴즈 방의 상세 정보 조회
- **Response**: 방 코드, 호스트 정보, 참가자 목록, 상태 등

### 2. GET `/api/quiz/rooms/{roomCode}/joinable`
퀴즈 방 참여 가능 여부 확인
- **Response**: `{ joinable: boolean, message?: string }`

### 3. GET `/api/quiz/rooms/host/{hostId}`
특정 호스트가 만든 퀴즈 방 목록 조회
- **Response**: 퀴즈 방 요약 정보 배열

### 4. GET `/api/quiz/rooms/classroom/{classRoomId}`
특정 클래스룸의 퀴즈 방 목록 조회
- **Response**: 퀴즈 방 요약 정보 배열

### 5. GET `/api/quiz/rooms/active`
활성화된 퀴즈 방 목록 조회
- **Response**: 퀴즈 방 요약 정보 배열

## 🎯 사용 방법

### 1. API 함수 직접 사용

```typescript
import { getQuizRoom, checkRoomJoinable } from '@/entities/Quiz/api';

// 방 정보 조회
const room = await getQuizRoom('ABCD1234');

// 참여 가능 여부 확인
const { joinable, message } = await checkRoomJoinable('ABCD1234');
```

### 2. React Query 훅 사용 (권장)

```typescript
import { 
  useQuizRoom, 
  useCheckRoomJoinable,
  useActiveQuizRooms 
} from '@/entities/Quiz/api';

function MyComponent() {
  // 방 정보 자동 캐싱 및 리페칭
  const { data: room, isLoading, error } = useQuizRoom('ABCD1234');

  // 참여 가능 여부 확인
  const { data: joinable } = useCheckRoomJoinable('ABCD1234');

  // 활성 방 목록 (5초마다 자동 갱신)
  const { data: rooms } = useActiveQuizRooms({
    refetchInterval: 5000,
  });

  return (
    <div>
      {isLoading && <p>로딩중...</p>}
      {room && <p>{room.roomCode}</p>}
    </div>
  );
}
```

### 3. 학생 페이지에서 참여 가능 여부 확인

```typescript
// src/pages/Student/Quiz/index.tsx
const handleJoinRoom = async (code: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/quiz/rooms/${code}/joinable`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    
    const data = await response.json();
    
    if (!data.joinable) {
      alert(data.message || "참여할 수 없는 방입니다.");
      return;
    }

    // WebSocket 연결
    if (send) {
      send(`/app/quiz/join/${code}`, { userId: user.userId });
      setStep("waiting");
    }
  } catch (error) {
    alert("방 정보를 확인하는 중 오류가 발생했습니다.");
  }
};
```

## 🧪 테스트 페이지

테스트 페이지에서 API 동작을 확인할 수 있습니다:

**URL**: `/quiz-api-test`

### 기능:
1. ✅ 활성 퀴즈 방 목록 조회 (자동 갱신)
2. ✅ 방 코드 클릭 시 상세 정보 확인
3. ✅ 호스트 ID로 방 필터링
4. ✅ 클래스룸 ID로 방 필터링
5. ✅ 실시간 참가자 정보 확인

## 📦 주요 컴포넌트

### ActiveQuizList
활성 퀴즈 방 목록을 표시하는 컴포넌트

```typescript
import ActiveQuizList from '@/entities/Quiz/Student/ActiveQuizList';

<ActiveQuizList 
  onSelectRoom={(roomCode) => {
    console.log('Selected room:', roomCode);
  }}
/>
```

**특징**:
- 5초마다 자동 갱신
- 로딩/에러 상태 처리
- 방 상태별 색상 구분

### QuizRoomDetail
퀴즈 방 상세 정보를 표시하는 컴포넌트

```typescript
import QuizRoomDetail from '@/entities/Quiz/Teacher/QuizRoomDetail';

<QuizRoomDetail 
  roomCode="ABCD1234"
  onClose={() => console.log('Close')}
/>
```

**특징**:
- 3초마다 자동 갱신
- 참가자 목록 실시간 업데이트
- 시간 정보 표시

## 🔑 TypeScript 타입

```typescript
// 참가자 정보
interface Participant {
  userId: string;
  username: string;
  sessionId: string;
  score: number;
  correctAnswers: number;
  isReady: boolean;
  joinedAt: number;
}

// 퀴즈 방 상세 정보
interface QuizRoom {
  roomCode: string;
  hostId: string;
  hostName: string;
  status: string;
  maxParticipants: number;
  currentParticipants: number;
  questionCount: number;
  timePerQuestion: number;
  participants: Participant[];
  createdAt: string;
  startedAt: string;
  finishedAt: string;
}

// 퀴즈 방 요약 정보
interface QuizRoomSummary {
  roomCode: string;
  hostName: string;
  status: string;
  maxParticipants: number;
  currentParticipants: number;
  questionCount: number;
  timePerQuestion: number;
  createdAt: string;
}
```

## 🎨 상태별 색상

- **waiting**: 노란색 (대기 중)
- **active/in_progress**: 초록색 (진행 중)
- **finished**: 회색 (종료)

## 🔄 자동 갱신

- **ActiveQuizList**: 5초마다 자동 갱신
- **QuizRoomDetail**: 3초마다 자동 갱신
- 수동 갱신: `refetch()` 함수 사용

## ✨ 완성된 기능

- [x] 방 조회 API (상세, 목록, 필터링)
- [x] 참여 가능 여부 확인
- [x] React Query 캐싱 및 자동 갱신
- [x] 학생 방 목록 컴포넌트
- [x] 실시간 업데이트

## 🚀 향후 개선 사항

- [ ] 실시간 알림 기능
- [ ] 방 검색 및 필터링 (이름, 상태)
- [ ] 페이지네이션 추가
- [ ] 무한 스크롤 지원
