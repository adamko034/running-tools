import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { LoggerDev } from '../utils/logger-dev';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdsenseService {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.adsbygoogle = window.adsbygoogle || [];
    }
  }

  /**
   * Push ad to display queue
   */
  pushAd(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      LoggerDev.log('pushing ad');
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      LoggerDev.error('❌ Error pushing ad:', error);
    }
  }
}
