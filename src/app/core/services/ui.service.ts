import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  get isMobile$(): Observable<boolean> {
    return this.breakpointObserver
      .observe(['(max-width: 750px)'])
      .pipe(map(result => result.matches));
  }

  get isMobileXs$(): Observable<boolean> {
    return this.breakpointObserver
      .observe(['(max-width: 470px)'])
      .pipe(map(result => result.matches));
  }
}
