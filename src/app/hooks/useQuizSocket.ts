import { useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription, IFrame } from "@stomp/stompjs";

type QuizSocketOptions = {
  url?: string;
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

// 환경 변수에서 WebSocket URL 가져오기
const DEFAULT_WS_URL = import.meta.env.VITE_WS_QUIZ_URL || "ws://localhost:8080/ws-quiz";

// url 수정
export function useQuizSocket({ url = DEFAULT_WS_URL, onConnect, onError, autoSubscribe = [] }: QuizSocketOptions = {}) {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const subscriptionsRef = useRef<StompSubscription[]>([]);

  useEffect(() => {
    const client = new Client({
      // use SockJS so Spring STOMP endpoint with SockJS works
      webSocketFactory: () => new SockJS(url),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log('[STOMP Debug]', str);
      },
      // before connecting, make sure the CONNECT frame has the latest access token
      beforeConnect: () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (token) {
            // assign connectHeaders so the CONNECT frame includes Authorization
            // (StompJS will read client.connectHeaders when sending CONNECT)
            client.connectHeaders = { Authorization: `Bearer ${token}` };
          }
        } catch {
          /* ignore localStorage errors */
        }
      },
      onConnect: (frame) => {
        clientRef.current = client;
        setConnected(true);
        console.log('[Quiz WebSocket] Connected', frame);

        // 자동 구독 설정
        autoSubscribe.forEach(({ destination, callback }) => {
          const sub = client.subscribe(destination, (m: IMessage) => {
            try {
              const data = JSON.parse(m.body);
              console.log(`[Quiz WebSocket] Received from ${destination}:`, data);
              callback(data);
            } catch {
              console.log(`[Quiz WebSocket] Received from ${destination}:`, m.body);
              callback(m.body);
            }
          });
          subscriptionsRef.current.push(sub);
        });

        onConnect?.(frame);
      },
      onStompError: (frame) => {
        console.error('[Quiz WebSocket] STOMP Error', frame);
        onError?.(frame);
      },
    });

    client.activate();

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
        
        client.deactivate();
      } catch {
        /* ignore */
      }
      clientRef.current = null;
      setConnected(false);
    };
  }, [url, onConnect, onError, autoSubscribe]);

  const subscribe = useCallback((destination: string, callback: (msg: unknown) => void): SubscriptionHandle | null => {
    if (!clientRef.current) return null;
    const sub: StompSubscription = clientRef.current.subscribe(destination, (m: IMessage) => {
      try {
        callback(JSON.parse(m.body));
      } catch {
        callback(m.body);
      }
    });
    return { unsubscribe: () => sub.unsubscribe() };
  }, []);

  const send = useCallback((destination: string, body: unknown) => {
    if (!clientRef.current) return;
    clientRef.current.publish({ destination, body: JSON.stringify(body) });
  }, []);

  return { connected, subscribe, send };
}

export default useQuizSocket;
