import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

export const languageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const urlSegments = state.url.split('/').filter(seg => seg);
  const locale = urlSegments[0] || '';

  if (!locale) {
    return router.navigate(['/']);
  }
  const languageService = inject(LanguageService);
  const languageSet = languageService.setLanguageFromLocale(locale);

  if (!languageSet) {
    return router.navigate(['/']);
  }

  return true;
};
