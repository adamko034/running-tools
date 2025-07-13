import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private storeService = inject(StoreService);
  private readonly supportedLanguages = ['en', 'de', 'fr', 'es', 'pl', 'it'];
  private readonly supportedLocales = [
    'en-us',
    'de-de',
    'fr-fr',
    'es-es',
    'pl-pl',
    'it-it',
  ];

  constructor(private translateService: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.storeService.lang());
  }

  setLanguageFromLocale(locale: string): boolean {
    const language = this.supportedLocales.includes(locale)
      ? locale.split('-')[0]
      : '';

    if (!language) {
      return false;
    }

    this.setLanguage(language);
    return true;
  }

  setLanguage(language: string): void {
    if (this.supportedLanguages.includes(language)) {
      this.translateService.use(language);
      this.storeService.updateLanguage(language);
    }
  }

  getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  getSupportedLanguages(): string[] {
    return [...this.supportedLanguages];
  }
}
