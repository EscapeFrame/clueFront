# Quiz Battle Backend Integration Guide

이 문서는 Quiz Battle 기능을 위한 백엔드 구현 가이드입니다.

## 필수 요구사항

- Java 17+
- Spring Boot 3.x
- Spring WebSocket & STOMP
- JWT Authentication

## 1. Dependency 설정 (build.gradle / pom.xml)

### Gradle
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-websocket'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'
}
```

### Maven
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-websocket</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>
```

## 2. Spring Security Configuration (WebSocket 허용)

**중요**: Spring Security를 사용하는 경우, WebSocket 엔드포인트를 명시적으로 허용해야 합니다.

```java
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // WebSocket 엔드포인트 허용 (중요!)
                .requestMatchers("/ws-quiz/**").permitAll()
                .requestMatchers("/topic/**").permitAll()
                // SockJS fallback 엔드포인트도 허용
                .requestMatchers("/ws-quiz/info").permitAll()
                .requestMatchers("/ws-quiz/websocket").permitAll()
                .requestMatchers("/ws-quiz/**/**").permitAll()
                // 기타 엔드포인트 설정
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 허용할 origin 설정 (프로덕션에서는 구체적인 도메인 지정 권장)
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",  // Vite 개발 서버
            "http://localhost:3000",  // React 개발 서버
            "https://yourdomain.com"  // 프로덕션 도메인
        ));

        // 또는 패턴 사용
        configuration.setAllowedOriginPatterns(List.of("*"));

        // 허용할 HTTP 메서드
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // 허용할 헤더
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // 인증 정보 허용 (쿠키, Authorization 헤더 등)
        configuration.setAllowCredentials(true);

        // preflight 요청 캐싱 시간 (초)
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## 3. WebSocket Configuration (CORS 포함)

```java
package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 클라이언트가 구독할 prefix
        config.enableSimpleBroker("/topic", "/queue");

        // 클라이언트가 메시지를 보낼 prefix
        config.setApplicationDestinationPrefixes("/app");

        // 특정 사용자에게 메시지 보낼 때 사용할 prefix
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-quiz")
                // CORS 설정: 허용할 origin 지정
                .setAllowedOrigins(
                    "http://localhost:5173",  // Vite 개발 서버
                    "http://localhost:3000",  // React 개발 서버
                    "https://yourdomain.com"  // 프로덕션 도메인
                )
                // 또는 패턴으로 모든 origin 허용 (개발 환경용)
                .setAllowedOriginPatterns("*")
                // 인증 정보(쿠키, Authorization 헤더) 허용
                .setAllowedHeaders("*")
                .withSockJS()
                    // SockJS 설정
                    .setStreamBytesLimit(512 * 1024)
                    .setHttpMessageCacheSize(1000)
                    .setDisconnectDelay(30 * 1000);

        // useQuizSocket.ts에서 사용하는 엔드포인트도 추가
        registry.addEndpoint("/topic/quiz/rooms")
                .setAllowedOriginPatterns("*")
                .setAllowedHeaders("*")
                .withSockJS();
    }
}
```

### CORS 설정 주의사항

1. **개발 환경**: `setAllowedOriginPatterns("*")`로 모든 origin 허용
2. **프로덕션 환경**: `setAllowedOrigins()`로 구체적인 도메인만 허용
3. **인증**: `setAllowedHeaders("*")`로 Authorization 헤더 허용 필수
4. **Spring Security**: WebSocket 엔드포인트를 명시적으로 permitAll() 처리

## 4. JWT Interceptor (WebSocket 인증)

```java
package com.example.config;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class WebSocketAuthInterceptor implements ChannelInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    public WebSocketAuthInterceptor(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String authToken = accessor.getFirstNativeHeader("Authorization");

            if (authToken != null && authToken.startsWith("Bearer ")) {
                String token = authToken.substring(7);

                if (jwtTokenProvider.validateToken(token)) {
                    String username = jwtTokenProvider.getUsernameFromToken(token);
                    UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, null);

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    accessor.setUser(authentication);
                }
            }
        }

        return message;
    }
}
```

## 5. DTO 클래스들

```java
// 방 생성 요청
public class CreateRoomRequest {
    private int maxParticipants;
    private int questionCount;
    private int timePerQuestion;
    private String classRoomId;
    private String documentId;
    // getters, setters, constructors
}

// 답변 제출 요청
public class SubmitAnswerRequest {
    private int questionNumber;
    private int answerIndex;
    private String submittedAt;
    private int timeSpent;
    // getters, setters, constructors
}

// 문제 데이터
public class QuestionData {
    private int questionNumber;
    private String questionText;
    private List<String> options;
    private int timeLimit;
    private int totalQuestions;
    // getters, setters, constructors
}

// 참가자 정보
public class ParticipantInfo {
    private String username;
    private String userId;
    private boolean isHost;
    private int score;
    // getters, setters, constructors
}

// WebSocket 응답
public class WebSocketResponse<T> {
    private String status; // "success", "error", "playing", "finished", "cancelled"
    private String message;
    private String roomCode;
    private T data;
    private List<ParticipantInfo> allParticipants;
    private List<RankingData> finalRankings;
    private List<RankingData> rankings;
    // getters, setters, constructors
}

// 순위 데이터
public class RankingData {
    private String username;
    private String userId;
    private int totalScore;
    private int correctAnswers;
    private int totalQuestions;
    // getters, setters, constructors
}
```

## 6. Controller 구현

```java
package com.example.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
public class QuizBattleController {

    private final SimpMessagingTemplate messagingTemplate;
    private final QuizBattleService quizBattleService;

    public QuizBattleController(SimpMessagingTemplate messagingTemplate,
                                QuizBattleService quizBattleService) {
        this.messagingTemplate = messagingTemplate;
        this.quizBattleService = quizBattleService;
    }

    // 방 생성
    @MessageMapping("/quiz/create")
    @SendTo("/topic/quiz/rooms")
    public WebSocketResponse<String> createRoom(CreateRoomRequest request,
                                                Authentication authentication) {
        String username = authentication.getName();
        String roomCode = quizBattleService.createRoom(username, request);

        WebSocketResponse<String> response = new WebSocketResponse<>();
        response.setStatus("success");
        response.setRoomCode(roomCode);
        response.setMessage("Room created successfully");

        return response;
    }

    // 방 참가
    @MessageMapping("/quiz/join/{roomCode}")
    public void joinRoom(@DestinationVariable String roomCode,
                        Authentication authentication) {
        String username = authentication.getName();

        try {
            List<ParticipantInfo> participants = quizBattleService.joinRoom(roomCode, username);

            WebSocketResponse<Void> response = new WebSocketResponse<>();
            response.setStatus("success");
            response.setAllParticipants(participants);
            response.setMessage(username + " joined the room");

            // 모든 참가자에게 업데이트 전송
            messagingTemplate.convertAndSend(
                "/topic/quiz/" + roomCode + "/participants",
                response
            );

        } catch (Exception e) {
            sendErrorToUser(authentication.getName(), e.getMessage());
        }
    }

    // 퀴즈 시작 (호스트만 가능)
    @MessageMapping("/quiz/start/{roomCode}")
    public void startQuiz(@DestinationVariable String roomCode,
                         Authentication authentication) {
        String username = authentication.getName();

        try {
            // 호스트 권한 확인
            if (!quizBattleService.isHost(roomCode, username)) {
                sendErrorToUser(username, "Only host can start the quiz");
                return;
            }

            // 첫 번째 문제 전송
            QuestionData question = quizBattleService.getNextQuestion(roomCode);

            WebSocketResponse<QuestionData> response = new WebSocketResponse<>();
            response.setStatus("playing");
            response.setData(question);

            messagingTemplate.convertAndSend(
                "/topic/quiz/" + roomCode + "/game",
                response
            );

        } catch (Exception e) {
            sendErrorToUser(username, e.getMessage());
        }
    }

    // 답변 제출
    @MessageMapping("/quiz/answer/{roomCode}")
    @SendToUser("/queue/quiz/result")
    public AnswerResult submitAnswer(@DestinationVariable String roomCode,
                                    SubmitAnswerRequest request,
                                    Authentication authentication) {
        String username = authentication.getName();

        return quizBattleService.submitAnswer(roomCode, username, request);
    }

    // 다음 문제 (호스트만 가능)
    @MessageMapping("/quiz/next/{roomCode}")
    public void nextQuestion(@DestinationVariable String roomCode,
                            Authentication authentication) {
        String username = authentication.getName();

        try {
            if (!quizBattleService.isHost(roomCode, username)) {
                sendErrorToUser(username, "Only host can proceed to next question");
                return;
            }

            if (quizBattleService.hasMoreQuestions(roomCode)) {
                QuestionData question = quizBattleService.getNextQuestion(roomCode);

                WebSocketResponse<QuestionData> response = new WebSocketResponse<>();
                response.setStatus("playing");
                response.setData(question);

                messagingTemplate.convertAndSend(
                    "/topic/quiz/" + roomCode + "/game",
                    response
                );
            } else {
                // 퀴즈 종료
                finishQuiz(roomCode);
            }

        } catch (Exception e) {
            sendErrorToUser(username, e.getMessage());
        }
    }

    // 순위 조회
    @MessageMapping("/quiz/rankings/{roomCode}")
    public void getRankings(@DestinationVariable String roomCode,
                           Authentication authentication) {
        List<RankingData> rankings = quizBattleService.getRankings(roomCode);

        WebSocketResponse<Void> response = new WebSocketResponse<>();
        response.setStatus("success");
        response.setRankings(rankings);

        messagingTemplate.convertAndSend(
            "/topic/quiz/" + roomCode + "/rankings",
            response
        );
    }

    // 방 나가기
    @MessageMapping("/quiz/leave/{roomCode}")
    public void leaveRoom(@DestinationVariable String roomCode,
                         Authentication authentication) {
        String username = authentication.getName();

        List<ParticipantInfo> participants = quizBattleService.leaveRoom(roomCode, username);

        WebSocketResponse<Void> response = new WebSocketResponse<>();
        response.setStatus("success");
        response.setAllParticipants(participants);
        response.setMessage(username + " left the room");

        messagingTemplate.convertAndSend(
            "/topic/quiz/" + roomCode + "/participants",
            response
        );
    }

    // 방 취소 (호스트만 가능)
    @MessageMapping("/quiz/cancel/{roomCode}")
    public void cancelRoom(@DestinationVariable String roomCode,
                          Authentication authentication) {
        String username = authentication.getName();

        if (!quizBattleService.isHost(roomCode, username)) {
            sendErrorToUser(username, "Only host can cancel the room");
            return;
        }

        quizBattleService.cancelRoom(roomCode);

        WebSocketResponse<Void> response = new WebSocketResponse<>();
        response.setStatus("cancelled");
        response.setMessage("Room has been cancelled by host");

        messagingTemplate.convertAndSend(
            "/topic/quiz/" + roomCode + "/game",
            response
        );
    }

    // 퀴즈 종료
    private void finishQuiz(String roomCode) {
        List<RankingData> finalRankings = quizBattleService.getFinalRankings(roomCode);

        WebSocketResponse<Void> response = new WebSocketResponse<>();
        response.setStatus("finished");
        response.setFinalRankings(finalRankings);
        response.setMessage("Quiz finished!");

        messagingTemplate.convertAndSend(
            "/topic/quiz/" + roomCode + "/game",
            response
        );
    }

    // 에러 전송
    private void sendErrorToUser(String username, String errorMessage) {
        WebSocketResponse<Void> errorResponse = new WebSocketResponse<>();
        errorResponse.setStatus("error");
        errorResponse.setMessage(errorMessage);

        messagingTemplate.convertAndSendToUser(
            username,
            "/queue/errors",
            errorResponse
        );
    }
}
```

## 7. Service 구현 예시

```java
package com.example.service;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class QuizBattleService {

    // 방 정보 저장 (실제로는 Redis나 DB 사용 권장)
    private final Map<String, QuizRoom> rooms = new ConcurrentHashMap<>();

    public String createRoom(String hostUsername, CreateRoomRequest request) {
        String roomCode = generateRoomCode();

        QuizRoom room = new QuizRoom();
        room.setRoomCode(roomCode);
        room.setHostUserId(hostUsername);
        room.setMaxParticipants(request.getMaxParticipants());
        room.setQuestionCount(request.getQuestionCount());
        room.setTimePerQuestion(request.getTimePerQuestion());
        room.setClassRoomId(request.getClassRoomId());
        room.setDocumentId(request.getDocumentId());

        // 호스트를 첫 번째 참가자로 추가
        ParticipantInfo host = new ParticipantInfo();
        host.setUsername(hostUsername);
        host.setUserId(hostUsername);
        host.setHost(true);
        host.setScore(0);
        room.addParticipant(host);

        rooms.put(roomCode, room);

        return roomCode;
    }

    public List<ParticipantInfo> joinRoom(String roomCode, String username) {
        QuizRoom room = rooms.get(roomCode);

        if (room == null) {
            throw new IllegalArgumentException("Room not found");
        }

        if (room.getParticipants().size() >= room.getMaxParticipants()) {
            throw new IllegalArgumentException("Room is full");
        }

        ParticipantInfo participant = new ParticipantInfo();
        participant.setUsername(username);
        participant.setUserId(username);
        participant.setHost(false);
        participant.setScore(0);

        room.addParticipant(participant);

        return room.getParticipants();
    }

    public boolean isHost(String roomCode, String username) {
        QuizRoom room = rooms.get(roomCode);
        return room != null && room.getHostUserId().equals(username);
    }

    public QuestionData getNextQuestion(String roomCode) {
        QuizRoom room = rooms.get(roomCode);

        if (room == null) {
            throw new IllegalArgumentException("Room not found");
        }

        // 실제로는 DB에서 문제를 가져와야 함
        int currentQuestionNum = room.getCurrentQuestionNumber() + 1;
        room.setCurrentQuestionNumber(currentQuestionNum);

        QuestionData question = new QuestionData();
        question.setQuestionNumber(currentQuestionNum);
        question.setQuestionText("Question " + currentQuestionNum);
        question.setOptions(Arrays.asList("Option 1", "Option 2", "Option 3", "Option 4"));
        question.setTimeLimit(room.getTimePerQuestion());
        question.setTotalQuestions(room.getQuestionCount());

        return question;
    }

    public AnswerResult submitAnswer(String roomCode, String username, SubmitAnswerRequest request) {
        // 답변 검증 및 점수 계산
        QuizRoom room = rooms.get(roomCode);

        // 실제 정답 확인 (DB에서 가져와야 함)
        boolean isCorrect = request.getAnswerIndex() == 0; // 예시

        int points = 0;
        if (isCorrect) {
            // 시간에 따른 점수 계산
            int maxTime = room.getTimePerQuestion();
            int timeSpent = request.getTimeSpent();
            points = Math.max(100, 1000 - (timeSpent * 10));

            // 참가자 점수 업데이트
            room.getParticipants().stream()
                .filter(p -> p.getUserId().equals(username))
                .findFirst()
                .ifPresent(p -> p.setScore(p.getScore() + points));
        }

        AnswerResult result = new AnswerResult();
        result.setCorrect(isCorrect);
        result.setPoints(points);
        result.setAnswerIndex(request.getAnswerIndex());

        return result;
    }

    public boolean hasMoreQuestions(String roomCode) {
        QuizRoom room = rooms.get(roomCode);
        return room != null && room.getCurrentQuestionNumber() < room.getQuestionCount();
    }

    public List<RankingData> getRankings(String roomCode) {
        QuizRoom room = rooms.get(roomCode);

        if (room == null) {
            return Collections.emptyList();
        }

        return room.getParticipants().stream()
            .sorted((p1, p2) -> Integer.compare(p2.getScore(), p1.getScore()))
            .map(p -> {
                RankingData ranking = new RankingData();
                ranking.setUsername(p.getUsername());
                ranking.setUserId(p.getUserId());
                ranking.setTotalScore(p.getScore());
                return ranking;
            })
            .toList();
    }

    public List<RankingData> getFinalRankings(String roomCode) {
        return getRankings(roomCode);
    }

    public List<ParticipantInfo> leaveRoom(String roomCode, String username) {
        QuizRoom room = rooms.get(roomCode);

        if (room != null) {
            room.getParticipants().removeIf(p -> p.getUserId().equals(username));

            // 호스트가 나가면 방 삭제
            if (room.getHostUserId().equals(username)) {
                rooms.remove(roomCode);
                return Collections.emptyList();
            }

            return room.getParticipants();
        }

        return Collections.emptyList();
    }

    public void cancelRoom(String roomCode) {
        rooms.remove(roomCode);
    }

    private String generateRoomCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            code.append(chars.charAt(random.nextInt(chars.length())));
        }

        return code.toString();
    }
}
```

## 8. 주요 엔드포인트 정리

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
- `/app/quiz/start/{roomCode}` - 퀴즈 시작
- `/app/quiz/answer/{roomCode}` - 답변 제출
- `/app/quiz/next/{roomCode}` - 다음 문제
- `/app/quiz/rankings/{roomCode}` - 순위 조회
- `/app/quiz/leave/{roomCode}` - 방 나가기
- `/app/quiz/cancel/{roomCode}` - 방 취소

## 9. 보안 고려사항

1. **JWT 토큰 검증**: 모든 WebSocket 연결에서 JWT 토큰을 검증해야 합니다
2. **권한 확인**: 호스트만 할 수 있는 작업(시작, 취소 등)은 반드시 권한을 확인해야 합니다
3. **Rate Limiting**: 답변 제출 등의 작업에 Rate Limiting을 적용하세요
4. **입력 검증**: 모든 사용자 입력은 검증되어야 합니다

## 10. 성능 최적화

1. **Redis 사용**: 방 정보와 게임 상태를 Redis에 저장하는 것을 권장합니다
2. **Connection Pool**: 데이터베이스 연결 풀을 적절히 설정하세요
3. **메시지 압축**: 큰 메시지는 압축을 고려하세요
4. **로깅 최적화**: 프로덕션 환경에서는 DEBUG 로그를 최소화하세요

## 11. 테스트

WebSocket 테스트를 위해 다음 도구들을 사용할 수 있습니다:
- Postman (WebSocket 지원)
- wscat
- 브라우저 개발자 도구

## 문의사항

백엔드 구현 중 문제가 발생하면 프론트엔드 팀에 문의해주세요.
