import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Navigation } from './core/navigation/navigation.model';
import { RouterService } from './core/services/router.service';
import { UiService } from './core/services/ui.service';
import { UnitStoreSelector } from './shared/components/store/unit-store-selector/unit-store-selector';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    UnitStoreSelector,
    MatSidenavModule,
    MatToolbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isHomePage$;
  isMobile = false;

  constructor(
    private routerService: RouterService,
    private uiService: UiService
  ) {
    this.isHomePage$ = this.routerService.isHomePage$;

    this.uiService.isMobile$.subscribe(isMobile => (this.isMobile = isMobile));
  }

  navigation: Navigation[] = [
    {
      title: 'race',
      links: [
        { text: 'pace / time / distance', link: 'race/pace-calculator' },
        { text: 'finish time predictor', link: 'race/finish-time-predictor' },
      ],
    },
    {
      title: 'personal',
      links: [
        { text: 'burned calories', link: 'personal/burned-calories-estimator' },
        { text: 'VO₂max', link: 'personal/vo2max-calculator' },
      ],
    },
    {
      title: 'units',
      links: [
        { text: 'pace / speed', link: 'units/pace-to-speed' },
        {
          text: 'kilometers / miles',
          link: 'units/kilometers-to-miles',
        },
        {
          text: 'kilograms / pounds',
          link: 'units/kilograms-to-pounds',
        },
      ],
    },
  ];
}
