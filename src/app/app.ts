import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Navigation } from './core/navigation/navigation.model';
import { NavigationService } from './core/services/navigation.service';
import { RouterService } from './core/services/router.service';
import { UiService } from './core/services/ui.service';
import { UnitStoreSelector } from './shared/components/store/unit-store-selector/unit-store-selector';
import { VersionDisplayComponent } from './shared/components/ui/version-display/version-display.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    UnitStoreSelector,
    MatSidenavModule,
    MatToolbarModule,
    VersionDisplayComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  isHomePage$;
  isMobile = false;
  navigation$: Observable<Navigation[]>;
  activeCategory: Navigation | null = null;

  private lastScrollTop = 0;
  private navBarElement: HTMLElement | null = null;

  constructor(
    private routerService: RouterService,
    private uiService: UiService,
    private navigationService: NavigationService,
    private elementRef: ElementRef
  ) {
    this.isHomePage$ = this.routerService.isHomePage$;
    this.navigation$ = this.navigationService.getNavigation();

    this.uiService.isMobile$.subscribe(isMobile => (this.isMobile = isMobile));
  }

  ngAfterViewInit() {
    this.navBarElement =
      this.elementRef.nativeElement.querySelector('.top-nav-bar');
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.navBarElement || this.isMobile) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class when scrolling down
    if (scrollTop > 50) {
      this.navBarElement.classList.add('scrolled');
    } else {
      this.navBarElement.classList.remove('scrolled');
    }

    // Hide navbar when scrolling down fast, show when scrolling up
    if (scrollTop > this.lastScrollTop && scrollTop > 200) {
      // Scrolling down
      this.navBarElement.classList.add('hidden');
    } else {
      // Scrolling up
      this.navBarElement.classList.remove('hidden');
    }

    this.lastScrollTop = scrollTop;
  }

  setActiveCategory(category: Navigation) {
    this.activeCategory = category;
  }

  clearActiveCategory() {
    this.activeCategory = null;
  }
}
