export class LoggerDev {
  private static isDevelopment(): boolean {
    return (
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.hostname.endsWith('.local'))
    );
  }

  static log(message?: any, ...optionalParams: any[]): void {
    if (this.isDevelopment()) {
      console.log(message, ...optionalParams);
    }
  }

  static warn(message?: any, ...optionalParams: any[]): void {
    if (this.isDevelopment()) {
      console.warn(message, ...optionalParams);
    }
  }

  static error(message?: any, ...optionalParams: any[]): void {
    if (this.isDevelopment()) {
      console.error(message, ...optionalParams);
    }
  }
}
