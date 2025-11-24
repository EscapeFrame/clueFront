import { useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription, IFrame } from "@stomp/stompjs";
import { getAccessToken } from "@/api/baseApi";

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

// 환경 변수에서 API URL 가져오기 (기존 패턴과 동일)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useQuizSocket({ onConnect, onError, autoSubscribe = [] }: QuizSocketOptions = {}) {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const subscriptionsRef = useRef<StompSubscription[]>([]);

  useEffect(() => {
    const accessToken = getAccessToken();
    
    if (!accessToken) {
      console.log('[Quiz WebSocket] Access token is missing, connection skipped.');
      setConnected(false);
      return;
    }

    const client = new Client({
      // SockJS를 사용 (기존 useStompClient와 동일)
      webSocketFactory: () => new SockJS(API_BASE_URL + '/ws-quiz'),
      heartbeatIncoming: 4000, // 서버로부터 4초 간격으로 하트비트 확인
      heartbeatOutgoing: 4000, // 클라이언트가 4초 간격으로 서버에 하트비트 전송
      reconnectDelay: 1000, // 연결이 끊어진 경우 1초 후 재연결 시도
      
      onConnect: (frame) => {
        clientRef.current = client;
        setConnected(true);
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
