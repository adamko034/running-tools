import { environment } from '../../../environments/environment.prod';

export class LoggerDev {
  private static isDevelopment(): boolean {
    return !environment.production;
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
