import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { SwUpdateService } from './core/services/sw-update.service';

// Factory function for TranslateHttpLoader
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

// Factory function for SW Update Service initialization
export function initializeSwUpdate() {
  return () => {
    // Service will auto-initialize in constructor
    return Promise.resolve();
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
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
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSwUpdate,
      deps: [SwUpdateService],
      multi: true,
    },
  ],
};
