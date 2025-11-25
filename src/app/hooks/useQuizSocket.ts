import { useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription, IFrame } from "@stomp/stompjs";
import { logger } from "@/shared/utils/logger";

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
  const [connecting, setConnecting] = useState(true); // 연결 중 상태 추가
  const subscriptionsRef = useRef<StompSubscription[]>([]);

  // autoSubscribe를 ref로 관리하여 불필요한 재연결 방지
  const autoSubscribeRef = useRef(autoSubscribe);

  useEffect(() => {
    autoSubscribeRef.current = autoSubscribe;
  }, [autoSubscribe]);

  useEffect(() => {
    // localStorage에서 accessToken 가져오기
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
      logger.warn('[Quiz WebSocket] Access token is missing, connection skipped.');
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
      
      onConnect: (frame) => {
        clientRef.current = client;
        setConnected(true);
        setConnecting(false); // 연결 완료
        logger.info('[Quiz WebSocket] Connected to STOMP');

        // 자동 구독 설정
        autoSubscribeRef.current.forEach(({ destination, callback }) => {
          const sub = client.subscribe(
            destination,
            (m: IMessage) => {
              try {
                const data = JSON.parse(m.body);
                logger.debug(`[Quiz WebSocket] Received from ${destination}:`, data);
                callback(data);
              } catch {
                logger.debug(`[Quiz WebSocket] Received from ${destination}:`, m.body);
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
        logger.error('[Quiz WebSocket] STOMP Error', frame);
        setConnected(false);
        onError?.(frame);
      },

      onDisconnect: () => {
        logger.info('[Quiz WebSocket] Disconnected');
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
          } catch (error) {
            logger.warn('[Quiz WebSocket] Failed to unsubscribe:', error);
          }
        });
        subscriptionsRef.current = [];

        setConnected(false);
        client.deactivate();
      } catch (error) {
        logger.warn('[Quiz WebSocket] Failed to cleanup connection:', error);
      }
      clientRef.current = null;
    };
  }, [onConnect, onError]); // autoSubscribe는 ref로 관리하므로 의존성 배열에서 제외

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
