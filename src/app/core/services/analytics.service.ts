import { inject, Injectable } from '@angular/core';
import { Analytics, getAnalytics, logEvent } from '@angular/fire/analytics';
import { FirebaseApp } from '@angular/fire/app';
import { LoggerDev } from '../utils/logger-dev';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private firebaseApp = inject(FirebaseApp);
  private analytics: Analytics | null = null;
  private isEnabled = false;

  constructor() {
    this.checkConsentAndInitialize();

    // Listen for consent changes
    window.addEventListener('cookieConsentChanged', (event: any) => {
      this.handleConsentChange(event.detail);
    });
  }

  private checkConsentAndInitialize(): void {
    const analyticsEnabled =
      localStorage.getItem('analytics-enabled') === 'true';

    if (analyticsEnabled && !this.analytics) {
      this.enableAnalytics();
    } else if (!analyticsEnabled && this.analytics) {
      this.disableAnalytics();
    }
  }

  private handleConsentChange(preferences: any): void {
    if (preferences.analytics && !this.isEnabled) {
      this.enableAnalytics();
    } else if (!preferences.analytics && this.isEnabled) {
      this.disableAnalytics();
    }
  }

  private enableAnalytics(): void {
    try {
      this.analytics = getAnalytics(this.firebaseApp);
      this.isEnabled = true;
      LoggerDev.log('Firebase Analytics enabled');
    } catch (error) {
      LoggerDev.error('Failed to initialize Firebase Analytics:', error);
    }
  }

  private disableAnalytics(): void {
    this.analytics = null;
    this.isEnabled = false;
    LoggerDev.log('Firebase Analytics disabled');
  }

  // Public method to log events (only works if analytics is enabled)
  logEvent(eventName: string, parameters?: Record<string, any>): void {
    if (this.analytics && this.isEnabled) {
      try {
        logEvent(this.analytics, eventName, {
          ...parameters,
          timestamp: new Date().toISOString(),
        });
        LoggerDev.log(`Analytics event logged: ${eventName}`, parameters);
      } catch (error) {
        LoggerDev.error('Failed to log analytics event:', error);
      }
    } else {
      LoggerDev.log(
        `Analytics event skipped (not enabled): ${eventName}`,
        parameters
      );
    }
  }

  // Check if analytics is currently enabled
  isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }

  // Get analytics instance (returns null if not enabled)
  getAnalytics(): Analytics | null {
    return this.analytics;
  }
}
