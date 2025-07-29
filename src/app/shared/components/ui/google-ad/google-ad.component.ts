import { CommonModule, isPlatformBrowser } from '@angular/common';
import { 
  Component, 
  Input, 
  OnInit, 
  OnDestroy, 
  inject, 
  PLATFORM_ID,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LoggerDev } from '../../../../core/utils/logger-dev';

declare global {
  interface Window {
    adsbygoogle: any[];
    cookieConsent: {
      advertising: boolean;
      analytics: boolean;
      essential: boolean;
    };
  }
}

@Component({
  selector: 'app-google-ad',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './google-ad.component.html',
  styleUrl: './google-ad.component.scss'
})
export class GoogleAdComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() adSlot!: string; // Required: Google AdSense ad slot ID
  @Input() adFormat: string = 'auto'; // Ad format (auto, rectangle, etc.)
  @Input() adLayout?: string; // Optional layout
  @Input() adLayoutKey?: string; // Optional layout key
  @Input() fullWidthResponsive: boolean = true; // Responsive ads
  @Input() minHeight: string = '250px'; // Minimum height for placeholder (only used for no-consent state)

  @ViewChild('adContainer', { static: true }) adContainer!: ElementRef;

  private platformId = inject(PLATFORM_ID);
  
  // Component state
  hasAdvertisingConsent = false;
  isAdLoading = false;
  isAdLoaded = false;
  adLoadError = false;
  isAdBlockerDetected = false;
  
  private consentCheckInterval?: number;
  private adLoadTimeout?: number;
  private resizeObserver?: ResizeObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.adSlot) {
      LoggerDev.error('GoogleAdComponent: adSlot is required');
      return;
    }

    this.checkAdvertisingConsent();
    this.setupConsentListener();
    this.detectAdBlocker();
    this.checkAdBlockerStatus();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      this.initializeAd();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.consentCheckInterval) {
      clearInterval(this.consentCheckInterval);
    }
    if (this.adLoadTimeout) {
      clearTimeout(this.adLoadTimeout);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private checkAdvertisingConsent(): void {
    // Check global consent object
    if (window.cookieConsent?.advertising) {
      this.hasAdvertisingConsent = true;
      return;
    }

    // Fallback to localStorage
    const advertisingEnabled = localStorage.getItem('advertising-enabled') === 'true';
    this.hasAdvertisingConsent = advertisingEnabled;
  }

  private setupConsentListener(): void {
    // Listen for consent changes
    window.addEventListener('cookieConsentChanged', (event: any) => {
      const previousConsent = this.hasAdvertisingConsent;
      this.hasAdvertisingConsent = event.detail?.advertising || false;
      
      // If consent changed from false to true, initialize ad
      if (!previousConsent && this.hasAdvertisingConsent) {
        this.initializeAd();
      }
      
      LoggerDev.log('GoogleAd: Consent changed', { 
        previous: previousConsent, 
        current: this.hasAdvertisingConsent 
      });
    });

    // Periodic check as fallback (in case event doesn't fire)
    this.consentCheckInterval = window.setInterval(() => {
      const previousConsent = this.hasAdvertisingConsent;
      this.checkAdvertisingConsent();
      
      if (!previousConsent && this.hasAdvertisingConsent) {
        this.initializeAd();
      }
    }, 2000);
  }

  private initializeAd(): void {
    if (!this.hasAdvertisingConsent || !isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check for ad blocker before attempting to load ads
    if (this.isAdBlockerDetected) {
      return; // Don't try to load ads if ad blocker is detected
    }

    // Reset states
    this.isAdLoading = true;
    this.isAdLoaded = false;
    this.adLoadError = false;

    try {
      // Ensure adsbygoogle is available
      if (typeof window.adsbygoogle === 'undefined') {
        // If adsbygoogle is still undefined, ad blocker is likely active
        this.isAdBlockerDetected = true;
        this.isAdLoading = false;
        LoggerDev.log('GoogleAd: Ad blocker detected - adsbygoogle not available');
        return;
      }

      // Set timeout for ad loading
      this.adLoadTimeout = window.setTimeout(() => {
        if (this.isAdLoading) {
          this.isAdLoading = false;
          this.adLoadError = true;
          LoggerDev.warn('GoogleAd: Ad loading timeout');
        }
      }, 10000); // 10 second timeout

      // Push ad to adsbygoogle queue
      window.adsbygoogle.push({});
      
      LoggerDev.log('GoogleAd: Ad initialization requested', { adSlot: this.adSlot });

      // Set up resize observer to monitor ad loading
      this.setupResizeObserver();

      // Check if ad loaded successfully after a short delay
      setTimeout(() => {
        this.checkAdLoadStatus();
      }, 2000);

    } catch (error) {
      this.isAdLoading = false;
      this.adLoadError = true;
      LoggerDev.error('GoogleAd: Failed to initialize ad', error);
    }
  }

  private checkAdLoadStatus(): void {
    const adElement = this.adContainer?.nativeElement?.querySelector('ins[data-ad-slot]');
    
    if (adElement) {
      // Check if ad has content and actual height
      const hasContent = adElement.innerHTML.trim().length > 0 || 
                        adElement.children.length > 0;
      const hasHeight = adElement.offsetHeight > 50; // Minimum meaningful height
      const iframe = adElement.querySelector('iframe');
      const iframeHasContent = iframe && iframe.offsetHeight > 50;

      if ((hasContent && hasHeight) || iframeHasContent) {
        this.isAdLoading = false;
        this.isAdLoaded = true;
        
        // Remove min-height constraint
        if (adElement instanceof HTMLElement) {
          adElement.style.minHeight = 'auto';
        }
        
        if (this.adLoadTimeout) {
          clearTimeout(this.adLoadTimeout);
        }
        LoggerDev.log('GoogleAd: Ad loaded successfully', { 
          height: adElement.offsetHeight,
          hasContent,
          hasHeight,
          iframeHeight: iframe?.offsetHeight 
        });
      } else {
        // Check again after a longer delay
        setTimeout(() => {
          this.recheckAdStatus();
        }, 3000);
      }
    } else {
      LoggerDev.warn('GoogleAd: Ad element not found');
    }
  }

  private recheckAdStatus(): void {
    const adElement = this.adContainer?.nativeElement?.querySelector('ins[data-ad-slot]');
    
    if (adElement) {
      const hasContent = adElement.innerHTML.trim().length > 0 || 
                        adElement.children.length > 0 ||
                        adElement.offsetHeight > 0;

      if (hasContent) {
        this.isAdLoading = false;
        this.isAdLoaded = true;
        if (this.adLoadTimeout) {
          clearTimeout(this.adLoadTimeout);
        }
        LoggerDev.log('GoogleAd: Ad loaded successfully (delayed)');
      } else if (this.isAdLoading) {
        // Still loading, let timeout handle it
        LoggerDev.log('GoogleAd: Ad still loading...');
      }
    }
  }


  // Method to open consent settings (if available)
  openConsentSettings(): void {
    // Try to trigger cookie consent banner
    const consentComponent = document.querySelector('app-cookie-consent');
    if (consentComponent) {
      // If there's a method to show the banner, call it
      // This would need to be implemented based on your consent component
      LoggerDev.log('GoogleAd: Attempting to open consent settings');
    }
    
    // Alternative: dispatch custom event
    window.dispatchEvent(new CustomEvent('showCookieConsent'));
  }

  private setupResizeObserver(): void {
    if (!isPlatformBrowser(this.platformId) || !window.ResizeObserver) {
      return;
    }

    const adElement = this.adContainer?.nativeElement?.querySelector('ins[data-ad-slot]');
    if (!adElement) return;

    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        
        // If ad has meaningful height, consider it loaded
        if (height > 50 && this.isAdLoading) {
          this.isAdLoading = false;
          this.isAdLoaded = true;
          
          if (this.adLoadTimeout) {
            clearTimeout(this.adLoadTimeout);
          }
          
          LoggerDev.log('GoogleAd: Ad loaded via ResizeObserver', { height });
          
          // Disconnect observer once loaded
          this.resizeObserver?.disconnect();
          break;
        }
      }
    });

    this.resizeObserver.observe(adElement);
  }

  private detectAdBlocker(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check if adsbygoogle script is loaded
    setTimeout(() => {
      // Method 1: Check if adsbygoogle is available
      if (typeof window.adsbygoogle === 'undefined') {
        this.isAdBlockerDetected = true;
        LoggerDev.log('GoogleAd: Ad blocker detected - adsbygoogle script blocked');
        return;
      }

      // Method 2: Check if Google AdSense script is in DOM
      const adsenseScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (!adsenseScript) {
        this.isAdBlockerDetected = true;
        LoggerDev.log('GoogleAd: Ad blocker detected - AdSense script not found');
        return;
      }

      // Method 3: Try to create a test ad element (common ad blocker detection)
      const testAd = document.createElement('div');
      testAd.innerHTML = '&nbsp;';
      testAd.className = 'adsbox';
      testAd.style.position = 'absolute';
      testAd.style.left = '-10000px';
      document.body.appendChild(testAd);

      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          this.isAdBlockerDetected = true;
          LoggerDev.log('GoogleAd: Ad blocker detected - test element blocked');
        }
        document.body.removeChild(testAd);
      }, 100);

    }, 1000); // Give time for scripts to load
  }

  private checkAdBlockerStatus(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check every 2 seconds if ad blocker was disabled
    setInterval(() => {
      if (this.isAdBlockerDetected && typeof window.adsbygoogle !== 'undefined') {
        // Ad blocker was disabled!
        this.isAdBlockerDetected = false;
        LoggerDev.log('GoogleAd: Ad blocker disabled, attempting to load ads');
        this.initializeAd();
      }
    }, 2000);
  }
}