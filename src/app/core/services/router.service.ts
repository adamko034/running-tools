import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  get isHomePage$() {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const url = (event as NavigationEnd).urlAfterRedirects;

        // Check for root or /xx-xx locale only
        const localeRegex = /^\/[a-z]{2}-[a-z]{2}\/?$/;
        return url === '/' || localeRegex.test(url);
      })
    );
  }
}
