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
      map((event: NavigationEnd) => event.url === '/')
    );
  }
}
