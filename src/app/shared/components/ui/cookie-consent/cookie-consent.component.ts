import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
}

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    TranslateModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss'
})
export class CookieConsentComponent implements OnInit {
  showBanner = false;
  showDetails = false;

  preferences: CookiePreferences = {
    essential: true, // Always required
    analytics: false,
    advertising: false,
  };

  private readonly CONSENT_KEY = 'cookie-consent';
  private readonly PREFERENCES_KEY = 'cookie-preferences';
  private readonly APP_OPENS_KEY = 'app-opens-count';
  private readonly LAST_CONSENT_DATE_KEY = 'last-consent-date';

  // Retry conditions
  private readonly RETRY_AFTER_WEEKS = 3;
  private readonly RETRY_AFTER_OPENS = 20;

  ngOnInit(): void {
    this.incrementAppOpens();
    this.checkConsentStatus();
  }

  private checkConsentStatus(): void {
    const consent = localStorage.getItem(this.CONSENT_KEY);

    if (!consent) {
      this.showBannerWithDelay();
      return;
    }

    // Check if we should retry asking for consent
    if (this.shouldRetryConsent()) {
      this.resetConsentForRetry();
      this.showBannerWithDelay();
      return;
    }

    // Load existing preferences
    const savedPreferences = localStorage.getItem(this.PREFERENCES_KEY);
    if (savedPreferences) {
      this.preferences = {
        ...this.preferences,
        ...JSON.parse(savedPreferences),
      };
    }
    this.applyConsent();
  }

  private showBannerWithDelay(): void {
    setTimeout(() => {
      this.showBanner = true;
    }, 1000);
  }

  private shouldRetryConsent(): boolean {
    const savedPreferences = localStorage.getItem(this.PREFERENCES_KEY);
    if (!savedPreferences) return false;

    const preferences = JSON.parse(savedPreferences);

    // If user accepted all cookies, don't retry
    if (preferences.analytics && preferences.advertising) {
      return false;
    }

    // Check time-based retry (3 weeks)
    const lastConsentDate = localStorage.getItem(this.LAST_CONSENT_DATE_KEY);
    if (lastConsentDate) {
      const daysSinceConsent =
        (Date.now() - parseInt(lastConsentDate)) / (1000 * 60 * 60 * 24);
      const weeksSinceConsent = daysSinceConsent / 7;

      if (weeksSinceConsent >= this.RETRY_AFTER_WEEKS) {
        return true;
      }
    }

    // Check app opens retry (20 opens)
    const appOpens = parseInt(localStorage.getItem(this.APP_OPENS_KEY) || '0');
    const consentData = JSON.parse(
      localStorage.getItem(this.CONSENT_KEY) || '{}'
    );
    const opensAtConsent = consentData.appOpensAtConsent || 0;
    const opensSinceConsent = appOpens - opensAtConsent;

    if (opensSinceConsent >= this.RETRY_AFTER_OPENS) {
      return true;
    }

    return false;
  }

  private incrementAppOpens(): void {
    const currentOpens = parseInt(
      localStorage.getItem(this.APP_OPENS_KEY) || '0'
    );
    localStorage.setItem(this.APP_OPENS_KEY, (currentOpens + 1).toString());
  }

  private resetConsentForRetry(): void {
    // Clear consent data but keep app opens counter
    localStorage.removeItem(this.CONSENT_KEY);
    localStorage.removeItem(this.PREFERENCES_KEY);
    localStorage.removeItem(this.LAST_CONSENT_DATE_KEY);

    // Reset preferences to default
    this.preferences = {
      essential: true,
      analytics: false,
      advertising: false,
    };
  }

  acceptAll(): void {
    this.preferences = {
      essential: true,
      analytics: true,
      advertising: true
    };
    this.hideBannerWithAnimation();
  }

  acceptSelected(): void {
    this.hideBannerWithAnimation();
  }

  rejectAll(): void {
    this.preferences = {
      essential: true, // Essential cookies cannot be disabled
      analytics: false,
      advertising: false
    };
    this.hideBannerWithAnimation();
  }

  private hideBannerWithAnimation(): void {
    // Add fade out class
    const bannerElement = document.querySelector('.cookie-banner');
    if (bannerElement) {
      bannerElement.classList.add('fade-out');
    }
    
    // Hide banner after animation completes
    setTimeout(() => {
      this.saveConsent();
    }, 300);
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;

    // When showing details, set all preferences to enabled by default
    if (this.showDetails) {
      this.preferences = {
        essential: true,
        analytics: true,
        advertising: true,
      };
    }
  }

  private saveConsent(): void {
    const currentAppOpens = parseInt(
      localStorage.getItem(this.APP_OPENS_KEY) || '0'
    );
    const consentData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      appOpensAtConsent: currentAppOpens,
    };

    localStorage.setItem(this.CONSENT_KEY, JSON.stringify(consentData));
    localStorage.setItem(
      this.PREFERENCES_KEY,
      JSON.stringify(this.preferences)
    );
    localStorage.setItem(this.LAST_CONSENT_DATE_KEY, Date.now().toString());

    console.log('Consent saved:', {
      preferences: this.preferences,
      appOpensAtConsent: currentAppOpens,
      acceptedAll: this.preferences.analytics && this.preferences.advertising,
    });

    this.applyConsent();
    this.showBanner = false;
    this.showDetails = false;
  }

  private applyConsent(): void {
    // Store consent preferences in localStorage for easy access
    localStorage.setItem(
      'analytics-enabled',
      this.preferences.analytics.toString()
    );
    localStorage.setItem(
      'advertising-enabled',
      this.preferences.advertising.toString()
    );

    // Set global flags for other parts of the app to check
    (window as any).cookieConsent = {
      analytics: this.preferences.analytics,
      advertising: this.preferences.advertising,
      essential: this.preferences.essential,
    };

    // Dispatch custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent('cookieConsentChanged', {
        detail: this.preferences,
      })
    );

    console.log('Cookie consent applied:', this.preferences);
  }

  // Method to reset consent (for testing or user preference changes)
  resetConsent(): void {
    localStorage.removeItem(this.CONSENT_KEY);
    localStorage.removeItem(this.PREFERENCES_KEY);
    localStorage.removeItem(this.LAST_CONSENT_DATE_KEY);
    // Keep app opens counter for testing
    this.showBanner = true;
    this.showDetails = false;
    this.preferences = {
      essential: true,
      analytics: false,
      advertising: false,
    };
  }

  // Method to force show banner (for testing)
  forceShowBanner(): void {
    this.showBanner = true;
    console.log('Banner forced to show');
  }
}
