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
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
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

const firebaseConfig = {
  apiKey: 'AIzaSyDoMelBdC2zgCyf70Oiqf9am2gXxyGN04U',
  authDomain: 'runner-toolkit.firebaseapp.com',
  projectId: 'runner-toolkit',
  storageBucket: 'runner-toolkit.firebasestorage.app',
  messagingSenderId: '684354601316',
  appId: '1:684354601316:web:d05ed696695ee347bb3a71',
  measurementId: 'G-8JEM0W90KY',
};

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
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerImmediately',
      scope: './',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeSwUpdate,
      deps: [SwUpdateService],
      multi: true,
    },
  ],
};
