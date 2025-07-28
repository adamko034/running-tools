import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Navigation } from './core/navigation/navigation.model';
import { AnalyticsService } from './core/services/analytics.service';
import { NavigationService } from './core/services/navigation.service';
import { PageTrackingService } from './core/services/page-tracking.service';
import { RouterService } from './core/services/router.service';
import { UiService } from './core/services/ui.service';
import { LoggerDev } from './core/utils/logger-dev';
import { UnitStoreSelector } from './shared/components/store/unit-store-selector/unit-store-selector';
import { CookieConsentComponent } from './shared/components/ui/cookie-consent/cookie-consent.component';
import { FooterComponent } from './shared/components/ui/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    UnitStoreSelector,
    MatSidenavModule,
    MatToolbarModule,
    FooterComponent,
    CookieConsentComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  isHomePage$;
  isMobile = false;
  navigation$: Observable<Navigation[]>;
  activeCategory: Navigation | null = null;

  private lastScrollTop = 0;
  private navBarElement: HTMLElement | null = null;

  constructor(
    private routerService: RouterService,
    private uiService: UiService,
    private navigationService: NavigationService,
    private elementRef: ElementRef,
    private analyticsService: AnalyticsService,
    private pageTrackingService: PageTrackingService
  ) {
    this.isHomePage$ = this.routerService.isHomePage$;
    this.navigation$ = this.navigationService.getNavigation();

    this.uiService.isMobile$.subscribe(isMobile => (this.isMobile = isMobile));
  }

  ngAfterViewInit() {
    this.navBarElement =
      this.elementRef.nativeElement.querySelector('.top-nav-bar');

    // Log app start event (only works if user has consented)
    this.analyticsService.logEvent('app_start', {
      timestamp: new Date().toISOString(),
    });

    // Page tracking is automatically handled by PageTrackingService
    LoggerDev.log('Page tracking service initialized');
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.navBarElement) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDifference = Math.abs(scrollTop - this.lastScrollTop);

    // Add scrolled class when scrolling down
    if (scrollTop > 50) {
      this.navBarElement.classList.add('scrolled');
    } else {
      this.navBarElement.classList.remove('scrolled');
    }

    // Only hide/show navbar on significant scroll movements to prevent shaking
    if (scrollDifference > 10) {
      if (scrollTop > this.lastScrollTop && scrollTop > 200) {
        // Scrolling down - hide navbar
        this.navBarElement.classList.add('hidden');
      } else if (scrollTop < this.lastScrollTop) {
        // Scrolling up - show navbar
        this.navBarElement.classList.remove('hidden');
      }
      this.lastScrollTop = scrollTop;
    }
  }

  setActiveCategory(category: Navigation) {
    this.activeCategory = category;
  }

  clearActiveCategory() {
    this.activeCategory = null;
  }
}
