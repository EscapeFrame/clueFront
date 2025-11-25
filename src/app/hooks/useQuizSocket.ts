import { useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription, IFrame } from "@stomp/stompjs";

type QuizSocketOptions = {
  onConnect?: (frame?: IFrame) => void;
  onError?: (err?: IFrame) => void;
  autoSubscribe?: {
    destination: string;
    callback: (msg: unknown) => void;
  }[];
};

type SubscriptionHandle = {
  unsubscribe: () => void;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useQuizSocket({ onConnect, onError, autoSubscribe = [] }: QuizSocketOptions = {}) {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true); // 연결 중 상태 추가
  // 자동 구독(subscribe 호출 시 기록 후 재연결 시 재등록)
  const subscriptionsRef = useRef<StompSubscription[]>([]);
  const manualSubscriptionMetaRef = useRef<{ destination: string; callback: (msg: unknown) => void; headers?: Record<string,string> }[]>([]);
  // 연결 중 전송된 메시지 큐(연결 후 플러시)
  const pendingSendQueueRef = useRef<{ destination: string; body: unknown }[]>([]);
  // 재연결 시도 횟수 제한
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    // localStorage에서 accessToken 가져오기
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      console.log('[Quiz WebSocket] Access token is missing, connection skipped.');
      setConnected(false);
      setConnecting(false); // 토큰 없으면 연결 시도 안함
      return;
    }

    setConnecting(true); // 연결 시작

    const client = new Client({
      // SockJS를 사용 (기존 useStompClient와 동일)
      webSocketFactory: () => new SockJS(API_BASE_URL + '/ws-quiz'),
      heartbeatIncoming: 4000, // 서버로부터 4초 간격으로 하트비트 확인
      heartbeatOutgoing: 4000, // 클라이언트가 4초 간격으로 서버에 하트비트 전송
      reconnectDelay: 5000, // 연결이 끊어진 경우 5초 후 재연결 시도
      connectHeaders: { Authorization: `Bearer ${accessToken}` }, // CONNECT 프레임 헤더 추가
      
      // 재연결 제한
      beforeConnect: () => {
        if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          console.error('[Quiz WebSocket] ⚠️ Max reconnection attempts reached. Stopping reconnection.');
          console.error('[Quiz WebSocket] 서버가 계속 연결을 거부합니다.');
          return Promise.reject(new Error('Max reconnection attempts'));
        }
        reconnectAttemptsRef.current++;
        console.log(`[Quiz WebSocket] Connection attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts}`);
        return Promise.resolve();
      },
      
      debug: (str) => {
        // STOMP 프레임 디버깅 - 모든 중요 프레임 출력
        if (str.includes('ERROR') || 
            str.includes('MESSAGE') || 
            str.includes('CONNECTED') ||
            str.includes('SUBSCRIBE') ||
            str.includes('RECEIPT') ||
            str.includes('DISCONNECT')) {
          console.log('[Quiz WebSocket DEBUG]', str);
        }
      },
      onConnect: (frame) => {
        reconnectAttemptsRef.current = 0; // 연결 성공 시 카운터 리셋
        clientRef.current = client;
        console.log('[Quiz WebSocket] ✅ Connected to STOMP successfully');
        console.log('[Quiz WebSocket] Connection frame:', frame);
        console.log('[Quiz WebSocket] Server version:', frame.headers?.['version']);
        console.log('[Quiz WebSocket] Heart-beat:', frame.headers?.['heart-beat']);

        // ⚠️ 중요: setConnected를 먼저 호출하여 구독 가능하게 만듦
        setConnected(true);
        setConnecting(false); // 연결 완료

        // 자동 구독 설정
        autoSubscribe.forEach(({ destination, callback }) => {
          console.log('[Quiz WebSocket] Auto-subscribing to:', destination);
          try {
            const sub = client.subscribe(
              destination,
              (m: IMessage) => {
                try {
                  const data = JSON.parse(m.body);
                  console.log(`[Quiz WebSocket] Received from ${destination}:`, data);
                  callback(data);
                } catch {
                  console.log(`[Quiz WebSocket] Received from ${destination}:`, m.body);
                  callback(m.body);
                }
              },
              { Authorization: `Bearer ${accessToken}` }
            );
            subscriptionsRef.current.push(sub);
            console.log('[Quiz WebSocket] ✅ Auto-subscribed successfully to:', destination);
          } catch (err) {
            console.error('[Quiz WebSocket] ❌ Auto-subscribe failed:', destination, err);
          }
        });

        // 재연결 시 manual subscribe 재등록 (약간의 지연 추가)
        if (manualSubscriptionMetaRef.current.length) {
          console.log(`[Quiz WebSocket] Re-subscribing ${manualSubscriptionMetaRef.current.length} subscriptions after short delay...`);
          
          // 서버가 CONNECTED를 보낸 직후 바로 SUBSCRIBE하면 거부할 수 있으므로 100ms 지연
          setTimeout(() => {
            // 중복 제거 (destination 기준)
            const uniqueSubs = Array.from(
              new Map(
                manualSubscriptionMetaRef.current.map(item => [item.destination, item])
              ).values()
            );
            
            // 기존 메타 초기화 (재구독 성공 후 다시 추가됨)
            manualSubscriptionMetaRef.current = [];
            
            uniqueSubs.forEach(({ destination, callback, headers }) => {
              try {
                console.log('[Quiz WebSocket] 📤 Re-subscribing to:', destination);
                const sub = client.subscribe(
                  destination,
                  (m: IMessage) => {
                    try {
                      callback(JSON.parse(m.body));
                    } catch {
                      callback(m.body);
                    }
                  },
                  headers || { Authorization: `Bearer ${accessToken}` }
                );
                subscriptionsRef.current.push(sub);
                manualSubscriptionMetaRef.current.push({ destination, callback, headers });
                console.log(`[Quiz WebSocket] ✅ Re-subscribed successfully to ${destination}`);
              } catch (e) {
                console.error('[Quiz WebSocket] ❌ Failed to re-subscribe to', destination, e);
              }
            });
          }, 100);
        }

        // 대기중이던 send 메시지 플러시
        if (pendingSendQueueRef.current.length) {
          pendingSendQueueRef.current.forEach(({ destination, body }) => {
            try {
              client.publish({ destination, body: JSON.stringify(body) });
              console.log('[Quiz WebSocket] Flushed queued message to', destination);
            } catch (e) {
              console.error('[Quiz WebSocket] Failed flushing queued message', destination, e);
            }
          });
          pendingSendQueueRef.current = [];
        }

        onConnect?.(frame);
      },
      
      onStompError: (frame) => {
        console.error('[Quiz WebSocket] STOMP Error', frame);
        console.error('[Quiz WebSocket] Error details:', {
          command: frame.command,
          headers: frame.headers,
          body: frame.body,
          isBinaryBody: frame.isBinaryBody
        });
        
        // 인증 에러면 토큰 문제
        if (frame.headers?.message?.includes('Unauthorized') || 
            frame.headers?.message?.includes('Invalid token') ||
            frame.body?.includes('Unauthorized')) {
          console.error('[Quiz WebSocket] ⚠️ AUTHENTICATION FAILED - Check your token!');
          alert('인증에 실패했습니다. 다시 로그인해주세요.');
        }
        
        setConnected(false);
        onError?.(frame);
      },
      
      onDisconnect: () => {
        console.warn('[Quiz WebSocket] ⚠️ Disconnected from server');
        console.warn('[Quiz WebSocket] Reconnect attempts:', reconnectAttemptsRef.current);
        setConnected(false);
      },
      onWebSocketClose: (event) => {
        const closeInfo = {
          code: event?.code,
          reason: event?.reason || 'No reason provided',
          wasClean: event?.wasClean
        };
        console.warn('[Quiz WebSocket] ⚠️ WebSocket closed', closeInfo);
        
        // code 1000은 정상 종료인데 서버가 의도적으로 끊는 것
        if (event?.code === 1000 && reconnectAttemptsRef.current > 1) {
          console.error('[Quiz WebSocket] 🚨 서버가 연결을 반복적으로 종료합니다!');
          console.error('[Quiz WebSocket] 가능한 원인:');
          console.error('  1. 구독 권한 없음 (/topic/quiz/rooms)');
          console.error('  2. JWT 토큰 문제 (만료/유효하지 않음)');
          console.error('  3. 서버 WebSocket 설정 오류');
          console.error('[Quiz WebSocket] 백엔드 개발자에게 문의하세요!');
        }
        
        setConnected(false);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      try {
        // 모든 구독 해제
        subscriptionsRef.current.forEach(sub => {
          try {
            sub.unsubscribe();
          } catch {
            /* ignore */
          }
        });
        subscriptionsRef.current = [];
        
        setConnected(false);
        client.deactivate();
      } catch {
        /* ignore */
      }
      clientRef.current = null;
    };
  }, [onConnect, onError, autoSubscribe]);

  const subscribe = useCallback((destination: string, callback: (msg: unknown) => void, headers: Record<string,string> = {}): SubscriptionHandle | null => {
    const accessToken = localStorage.getItem("accessToken");
    const mergedHeaders = { Authorization: `Bearer ${accessToken}`, ...headers };
    
    // 중복 구독 방지 체크
    const isDuplicate = manualSubscriptionMetaRef.current.some(
      meta => meta.destination === destination
    );
    
    console.log('[Quiz WebSocket] Subscribe attempt:', {
      destination,
      connected,
      clientConnected: clientRef.current?.connected,
      isDuplicate
    });
    
    if (!clientRef.current || !connected || clientRef.current.connected !== true) {
      if (!isDuplicate) {
        console.warn('[Quiz WebSocket] ⏳ Delaying subscribe until connected:', destination);
        manualSubscriptionMetaRef.current.push({ destination, callback, headers: mergedHeaders });
      } else {
        console.warn('[Quiz WebSocket] ⏳ Subscribe already queued:', destination);
      }
      return null;
    }
    
    // 이미 구독 대기 중이면 스킵
    if (isDuplicate) {
      console.log('[Quiz WebSocket] ✋ Subscription already pending:', destination);
      return null;
    }
    
    try {
      console.log('[Quiz WebSocket] 📤 Sending SUBSCRIBE frame to:', destination);
      const sub: StompSubscription = clientRef.current.subscribe(
        destination,
        (m: IMessage) => {
          try {
            callback(JSON.parse(m.body));
          } catch {
            callback(m.body);
          }
        },
        mergedHeaders
      );
      manualSubscriptionMetaRef.current.push({ destination, callback, headers: mergedHeaders });
      console.log('[Quiz WebSocket] ✅ Successfully subscribed to:', destination);
      return { unsubscribe: () => {
        try { sub.unsubscribe(); } catch {/* ignore */}
        manualSubscriptionMetaRef.current = manualSubscriptionMetaRef.current.filter(meta => meta.destination !== destination);
      } };
    } catch (error: unknown) {
      console.error('[Quiz WebSocket] ❌ Subscribe error:', destination, error);
      const msg = (error as { message?: string } | null)?.message ?? '';
      if (msg.toLowerCase().includes('no underlying stomp')) {
        if (!isDuplicate) {
          manualSubscriptionMetaRef.current.push({ destination, callback, headers: mergedHeaders });
        }
        return null;
      }
      return null;
    }
  }, [connected]);

  const send = useCallback((destination: string, body: unknown) => {
    if (!clientRef.current || !connected || clientRef.current.connected !== true) {
      console.warn('[Quiz WebSocket] Queueing message until connected:', destination);
      pendingSendQueueRef.current.push({ destination, body });
      return;
    }
    try {
      clientRef.current.publish({ destination, body: JSON.stringify(body) });
    } catch (error) {
      console.error('[Quiz WebSocket] Send error:', error);
    }
  }, [connected]);

  return { connected, connecting, subscribe, send };
}

export default useQuizSocket;
