import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationLink } from '../navigation/navigation-link.model';
import { LoggerDev } from '../utils/logger-dev';
import { AnalyticsService } from './analytics.service';
import { NavigationService } from './navigation.service';

interface PageInfo {
  event_name: string;
  page_title: string;
}

@Injectable({
  providedIn: 'root',
})
export class PageTrackingService {
  private router = inject(Router);
  private analyticsService = inject(AnalyticsService);
  private navigationService = inject(NavigationService);

  private pageMap: Record<string, PageInfo> = {};
  private isInitialized = false;

  constructor() {
    this.initializePageTracking();
  }

  private async initializePageTracking(): Promise<void> {
    // Build page map from navigation service
    await this.buildPageMapFromNavigation();

    // Listen to router navigation events
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Track immediately - no delay needed
        this.trackPageView(event.urlAfterRedirects || event.url);
      });
  }

  private async buildPageMapFromNavigation(): Promise<void> {
    try {
      // Add static pages manually
      this.pageMap[''] = { event_name: 'home_page', page_title: 'Home' };
      this.pageMap['/'] = { event_name: 'home_page', page_title: 'Home' };
      this.pageMap['/contact'] = {
        event_name: 'contact_page',
        page_title: 'Contact',
      };
      this.pageMap['/privacy-policy'] = {
        event_name: 'privacy_policy',
        page_title: 'Privacy policy',
      };

      // Get navigation data from the service and build page map
      this.navigationService.getNavigation().subscribe(navigation => {
        navigation.forEach(category => {
          category.links.forEach(link => {
            const route = `/${link.link}`;
            const eventName = this.generateEventNameFromRoute(route);
            const pageTitle = this.generatePageTitleFromLink(link);

            this.pageMap[route] = {
              event_name: eventName,
              page_title: pageTitle,
            };
          });
        });

        this.isInitialized = true;
        LoggerDev.log(
          'Page tracking map built from navigation service:',
          this.pageMap
        );
      });
    } catch (error) {
      LoggerDev.error(
        'Failed to build page map from navigation service:',
        error
      );
      // Fallback to basic tracking
      this.isInitialized = true;
    }
  }

  private generateEventNameFromRoute(route: string): string {
    // Convert route to event name format
    return (
      route
        .replace(/^\//, '') // Remove leading slash
        .replace(/\//g, '_') // Replace slashes with underscores
        .replace(/-/g, '_') // Replace hyphens with underscores
        .toLowerCase() || 'unknown_page'
    );
  }

  private generatePageTitleFromLink(link: NavigationLink): string {
    // Use the link text and clean it up for analytics
    return link.text
      .replace(/Calculator/i, 'calculator') // Normalize "Calculator"
      .replace(/Converter/i, 'converter') // Normalize "Converter"
      .replace(/Predictor/i, 'predictor') // Normalize "Predictor"
      .trim();
  }

  private trackPageView(url: string): void {
    // Wait for initialization if not ready
    if (!this.isInitialized) {
      setTimeout(() => this.trackPageView(url), 100);
      return;
    }

    // Clean the URL (remove query parameters and fragments)
    const cleanUrl = url.split('?')[0].split('#')[0];

    // Get page info from the map
    const pageInfo = this.pageMap[cleanUrl];

    if (pageInfo) {
      // Log the page view event
      this.analyticsService.logEvent(pageInfo.event_name, {
        page_title: pageInfo.page_title,
        page_location: window.location.href,
      });

      LoggerDev.log(
        `Page tracked: ${pageInfo.page_title} (${pageInfo.event_name})`
      );
    } else {
      // Fallback for unmapped pages
      const fallbackEventName = this.generateEventNameFromRoute(cleanUrl);
      const fallbackTitle = this.generateFallbackTitle(cleanUrl);

      this.analyticsService.logEvent(fallbackEventName, {
        page_title: fallbackTitle,
        page_location: window.location.href,
        page_path: cleanUrl,
      });

      LoggerDev.log(
        `Page tracked (fallback): ${fallbackTitle} (${fallbackEventName})`
      );
      LoggerDev.warn(`Page not found in navigation map: ${cleanUrl}`);
    }
  }

  private generateFallbackTitle(url: string): string {
    // Convert URL to readable title as fallback
    const segments = url.split('/').filter(segment => segment);

    if (segments.length === 0) return 'Unknown page';

    // Take the last segment and make it readable
    const lastSegment = segments[segments.length - 1];
    return lastSegment
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
  }

  // Method to get page info for current route
  getCurrentPageInfo(): PageInfo | null {
    const currentUrl = this.router.url.split('?')[0].split('#')[0];
    return this.pageMap[currentUrl] || null;
  }

  // Method to get all tracked pages (for debugging)
  getAllTrackedPages(): Record<string, PageInfo> {
    return { ...this.pageMap };
  }
}
