/**
 * 환경 변수 기반 로깅 유틸리티
 * 프로덕션 환경에서는 로그가 출력되지 않습니다.
 */

const isDevelopment = import.meta.env.DEV;

class Logger {
  /**
   * 일반 로그 출력 (개발 환경에서만)
   */
  log(...args: unknown[]): void {
    if (isDevelopment) {
      console.log(...args);
    }
  }

  /**
   * 정보성 로그 출력 (개발 환경에서만)
   */
  info(...args: unknown[]): void {
    if (isDevelopment) {
      console.info(...args);
    }
  }

  /**
   * 경고 로그 출력 (개발 환경에서만)
   */
  warn(...args: unknown[]): void {
    if (isDevelopment) {
      console.warn(...args);
    }
  }

  /**
   * 에러 로그 출력 (프로덕션 환경에서도 출력)
   * 프로덕션에서는 에러 추적 서비스로 전송 가능
   */
  error(...args: unknown[]): void {
    console.error(...args);
    // TODO: 프로덕션 환경에서 에러 추적 서비스(Sentry 등)로 전송
  }

  /**
   * 디버그 로그 출력 (개발 환경에서만)
   */
  debug(...args: unknown[]): void {
    if (isDevelopment) {
      console.debug(...args);
    }
  }

  /**
   * 테이블 형식으로 로그 출력 (개발 환경에서만)
   */
  table(data: unknown): void {
    if (isDevelopment) {
      console.table(data);
    }
  }

  /**
   * 그룹 로그 시작 (개발 환경에서만)
   */
  group(label: string): void {
    if (isDevelopment) {
      console.group(label);
    }
  }

  /**
   * 그룹 로그 종료 (개발 환경에서만)
   */
  groupEnd(): void {
    if (isDevelopment) {
      console.groupEnd();
    }
  }
}

export const logger = new Logger();
