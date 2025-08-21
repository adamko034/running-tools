import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, of } from 'rxjs';
import { routes } from './app.routes';

// Server-side loader that returns empty translations
class ServerTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    // Return empty object for SSR - translations will load in browser
    return of({});
  }
}

// Factory function for TranslateLoader
export function createTranslateLoader(http: HttpClient) {
  // Check if we're in browser environment
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    // Use HTTP loader in browser
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
  } else {
    // Use server loader during SSR
    return new ServerTranslateLoader();
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    // Only enable hydration in production with SSR
    ...(typeof document !== 'undefined' &&
    document.querySelector('script[type="application/json"]')
      ? [provideClientHydration(withEventReplay())]
      : []),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      })
    ),
  ],
};
