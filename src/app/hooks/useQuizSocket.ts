import { useEffect, useRef, useState, useCallback } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

type QuizSocketOptions = {
  url?: string;
  onConnect?: (frame?: any) => void;
  onError?: (err?: any) => void;
};

type SubscriptionHandle = {
  unsubscribe: () => void;
};

// url 수정
export function useQuizSocket({ url = "http://localhost:8080/ws-quiz", onConnect, onError }: QuizSocketOptions = {}) {
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      // use SockJS so Spring STOMP endpoint with SockJS works
      webSocketFactory: () => new SockJS(url),
      reconnectDelay: 5000,
      debug: () => {},
      onConnect: (frame) => {
        clientRef.current = client;
        setConnected(true);
        onConnect?.(frame);
      },
      onStompError: (frame) => {
        onError?.(frame);
      },
    });

    client.activate();

    return () => {
      try {
        client.deactivate();
      } catch {
        /* ignore */
      }
      clientRef.current = null;
      setConnected(false);
    };
  }, [url, onConnect, onError]);

  const subscribe = useCallback((destination: string, callback: (msg: any) => void): SubscriptionHandle | null => {
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
