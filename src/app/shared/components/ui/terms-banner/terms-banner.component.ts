import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-banner',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './terms-banner.component.html',
  styleUrl: './terms-banner.component.scss',
})
export class TermsBannerComponent implements OnInit {
  private router = inject(Router);
  private readonly STORAGE_KEY = 'terms-banner-dismissed';
  private platformId = inject(PLATFORM_ID);

  isVisible = false;
  isHiding = false;

  ngOnInit(): void {
    // Show banner with slight delay for better UX
    if (this.shouldShowBanner()) {
      setTimeout(() => {
        this.isVisible = true;
      }, 500);
    }
  }

  shouldShowBanner(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return !localStorage.getItem(this.STORAGE_KEY);
  }

  dismissBanner(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.isHiding = true;

    // Wait for animation to complete before hiding
    setTimeout(() => {
      this.isVisible = false;
      localStorage.setItem(this.STORAGE_KEY, 'true');
    }, 400);
  }

  openTerms(): void {
    this.router.navigate(['/terms-of-service']);
  }

  openPrivacy(): void {
    this.router.navigate(['/privacy-policy']);
  }
}
