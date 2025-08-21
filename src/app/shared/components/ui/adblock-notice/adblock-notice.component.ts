import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AdblockDetectorService } from '../../../../core/services/adblock-detector.service';

@Component({
  selector: 'app-adblock-notice',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './adblock-notice.component.html',
  styleUrl: './adblock-notice.component.scss',
})
export class AdblockNoticeComponent implements OnInit {
  private adblockDetector = inject(AdblockDetectorService);
  private platformId = inject(PLATFORM_ID);

  showNotice = false;
  dismissed = false;

  ngOnInit() {
    // Check if user should see the notice based on time and usage
    if (this.shouldShowNotice()) {
      // Subscribe to adblock detection
      this.adblockDetector.adblockDetected$.subscribe(detected => {
        if (detected && !this.dismissed) {
          // Show notice after a delay to avoid being too intrusive
          setTimeout(() => {
            this.showNotice = true;
          }, 3000);
        }
      });
    } else {
      this.dismissed = true;
    }

    // Track usage for counting
    this.trackUsage();
  }

  private shouldShowNotice(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false; // Don't show on server
    }

    const dismissData = localStorage.getItem('adblock-notice-data');

    if (!dismissData) {
      return true; // First time user
    }

    try {
      const data = JSON.parse(dismissData);
      const now = Date.now();
      const daysSinceDismiss = (now - data.dismissedAt) / (1000 * 60 * 60 * 24);

      // Show again if 7 days have passed OR 20+ usages since dismiss
      return daysSinceDismiss >= 7 || data.usagesSinceDismiss >= 20;
    } catch {
      return true; // If data is corrupted, show notice
    }
  }

  private trackUsage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Don't track on server
    }

    const dismissData = localStorage.getItem('adblock-notice-data');

    if (dismissData) {
      try {
        const data = JSON.parse(dismissData);
        data.usagesSinceDismiss = (data.usagesSinceDismiss || 0) + 1;
        localStorage.setItem('adblock-notice-data', JSON.stringify(data));
      } catch {
        // If data is corrupted, reset
        this.resetTrackingData();
      }
    }
  }

  private resetTrackingData(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Don't reset on server
    }

    const data = {
      dismissedAt: Date.now(),
      usagesSinceDismiss: 1,
    };
    localStorage.setItem('adblock-notice-data', JSON.stringify(data));
  }

  dismissNotice() {
    this.showNotice = false;
    this.dismissed = true;

    if (!isPlatformBrowser(this.platformId)) {
      return; // Don't store on server
    }

    // Store dismissal time and reset usage counter
    const data = {
      dismissedAt: Date.now(),
      usagesSinceDismiss: 0,
    };
    localStorage.setItem('adblock-notice-data', JSON.stringify(data));
  }
}
