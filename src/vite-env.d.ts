/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WS_QUIZ_URL: string;
  // 필요한 다른 환경 변수들...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}