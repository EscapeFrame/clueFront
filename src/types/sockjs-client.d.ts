declare module 'sockjs-client' {
  interface ConnectOptions {
    server?: string;
    transports?: string[];
    [key: string]: unknown;
  }

  interface SockJS {
    send(data: unknown): void;
    close(): void;
    onopen?: (e?: Event) => void;
    onmessage?: (e?: MessageEvent) => void;
    onclose?: (e?: CloseEvent) => void;
    readyState?: number;
    url?: string;
  }

  interface SockJSStatic {
    new (url: string, reserved?: string | null, options?: ConnectOptions): SockJS;
    (url: string, reserved?: string | null, options?: ConnectOptions): SockJS;
  }

  const SockJS: SockJSStatic;
  export = SockJS;
}
