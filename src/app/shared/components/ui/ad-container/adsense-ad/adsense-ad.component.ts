import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { AdsenseService } from '../../../../../core/services/adsense.service';
import { EnvironmentService } from '../../../../../core/services/environment.service';
import { LoggerDev } from '../../../../../core/utils/logger-dev';

@Component({
  selector: 'app-adsense-ad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adsense-ad.component.html',
  styleUrl: './adsense-ad.component.scss',
})
export class AdsenseAdComponent implements OnInit, AfterViewInit {
  @Input() slotId?: number;

  private adsenseService = inject(AdsenseService);
  private environmentService = inject(EnvironmentService);
  private platformId = inject(PLATFORM_ID);

  adClient = 'ca-pub-2064593657160416'; // Your AdSense client ID

  get isLocalhost(): boolean {
    return this.environmentService.isLocalhost();
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Initialize ad after view is ready
    setTimeout(() => {
      this.initializeAd();
    }, 0);
  }

  private initializeAd(): void {
    if (!this.slotId) {
      LoggerDev.warn('⚠️ AdSense ad slot not provided');
      return;
    }

    // Wait a bit for AdSense to load, then push the ad
    setTimeout(() => {
      this.adsenseService.pushAd();
    }, 1000);
  }
}
