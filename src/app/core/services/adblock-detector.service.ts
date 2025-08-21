import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoggerDev } from '../utils/logger-dev';

@Injectable({
  providedIn: 'root',
})
export class AdblockDetectorService {
  private adblockDetected = new BehaviorSubject<boolean>(false);
  private platformId = inject(PLATFORM_ID);
  public adblockDetected$ = this.adblockDetected.asObservable();

  constructor() {
    this.detectAdblock();
  }

  private detectAdblock(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Use multiple detection methods for maximum reliability
    this.createBaitElement();
    this.checkAdScript();
  }

  private createBaitElement(): void {
    // Create a bait element that looks like an ad
    const bait = document.createElement('div');

    // Use class names and attributes that adblockers commonly block
    bait.className =
      'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links adsbox';
    bait.setAttribute('id', 'adsense');
    bait.setAttribute('data-ad-client', 'test');

    // Make it invisible but detectable
    bait.style.position = 'absolute';
    bait.style.height = '1px';
    bait.style.position = 'absolute';
    bait.style.left = '-9999px';

    // Add some content that looks like an ad
    bait.innerHTML = '&nbsp;';

    // Add to page
    document.body.appendChild(bait);

    // Check if it gets blocked after a short delay
    setTimeout(() => {
      this.checkBaitElement(bait);
    }, 100);
  }

  private checkBaitElement(bait: HTMLElement): void {
    let isBlocked = false;

    try {
      // Check if element is hidden by adblocker
      const computedStyle = window.getComputedStyle(bait);

      isBlocked =
        bait.offsetHeight === 0 ||
        bait.offsetWidth === 0 ||
        computedStyle.display === 'none' ||
        computedStyle.visibility === 'hidden' ||
        computedStyle.opacity === '0';

      LoggerDev.log('Bait element check:', {
        offsetHeight: bait.offsetHeight,
        offsetWidth: bait.offsetWidth,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
        isBlocked,
      });
    } catch (error) {
      LoggerDev.log('Error checking bait element:', error);
      isBlocked = true; // Assume blocked if we can't check
    }

    // Clean up
    try {
      document.body.removeChild(bait);
    } catch (error) {
      LoggerDev.log('Bait element already removed by adblocker');
      isBlocked = true;
    }

    // Set detection result
    if (isBlocked) {
      LoggerDev.log('Adblock detected: Bait element was blocked');
      this.adblockDetected.next(true);
    } else {
      LoggerDev.log('No adblock detected: Bait element visible');
      // Don't set false here, let the script check also run
    }
  }

  private async checkAdScript(): Promise<void> {
    try {
      LoggerDev.log('Testing ad script request...');
      await fetch(
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        {
          method: 'HEAD',
          mode: 'no-cors', // Avoid CORS issues
        }
      );
      LoggerDev.log('Ad script request succeeded - no adblock detected');

      // Only set false if bait element also didn't detect adblock
      if (!this.adblockDetected.value) {
        this.adblockDetected.next(false);
      }
    } catch (error) {
      LoggerDev.log('Ad script request blocked - adblock detected:');
      this.adblockDetected.next(true);
    }
  }
}
