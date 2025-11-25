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
      reconnectDelay: 1000, // 연결이 끊어진 경우 1초 후 재연결 시도
      connectHeaders: { Authorization: `Bearer ${accessToken}` }, // CONNECT 프레임 헤더 추가
      onConnect: (frame) => {
        clientRef.current = client;
        setConnected(true);
        setConnecting(false); // 연결 완료
        console.log('[Quiz WebSocket] Connected to STOMP');

        // 자동 구독 설정
        autoSubscribe.forEach(({ destination, callback }) => {
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
        });

        // 재연결 시 manual subscribe 재등록
        if (manualSubscriptionMetaRef.current.length) {
          manualSubscriptionMetaRef.current.forEach(({ destination, callback, headers }) => {
            try {
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
              console.log(`[Quiz WebSocket] Re-subscribed to ${destination}`);
            } catch (e) {
              console.error('[Quiz WebSocket] Failed to re-subscribe', destination, e);
            }
          });
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
        setConnected(false);
        onError?.(frame);
      },
      
      onDisconnect: () => {
        console.log('[Quiz WebSocket] Disconnected');
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
    if (!clientRef.current || !connected) {
      console.warn('[Quiz WebSocket] Delaying subscribe until connected:', destination);
      // 기록만 하고 null 반환 (재연결 후 등록)
      manualSubscriptionMetaRef.current.push({ destination, callback, headers: mergedHeaders });
      return null;
    }
    try {
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
      return { unsubscribe: () => {
        try { sub.unsubscribe(); } catch {/* ignore */}
        manualSubscriptionMetaRef.current = manualSubscriptionMetaRef.current.filter(meta => meta.destination !== destination || meta.callback !== callback);
      } };
    } catch (error) {
      console.error('[Quiz WebSocket] Subscribe error:', error);
      return null;
    }
  }, [connected]);

  const send = useCallback((destination: string, body: unknown) => {
    if (!clientRef.current || !connected) {
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
