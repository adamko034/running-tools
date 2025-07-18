import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Navigation } from './core/navigation/navigation.model';
import { NavigationService } from './core/services/navigation.service';
import { RouterService } from './core/services/router.service';
import { UiService } from './core/services/ui.service';
import { UnitStoreSelector } from './shared/components/store/unit-store-selector/unit-store-selector';
import { LanguageStoreSelector } from './shared/components/store/language-store-selector/language-store-selector';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    UnitStoreSelector,
    LanguageStoreSelector,
    MatSidenavModule,
    MatToolbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isHomePage$;
  isMobile = false;
  navigation$: Observable<Navigation[]>;

  constructor(
    private routerService: RouterService,
    private uiService: UiService,
    private navigationService: NavigationService
  ) {
    this.isHomePage$ = this.routerService.isHomePage$;
    this.navigation$ = this.navigationService.getNavigation();

    this.uiService.isMobile$.subscribe(isMobile => (this.isMobile = isMobile));
  }
}
