import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { AdsenseAdComponent } from './adsense-ad/adsense-ad.component';

@Component({
  selector: 'app-ad-container',
  standalone: true,
  imports: [CommonModule, AdsenseAdComponent],
  templateUrl: './ad-container.component.html',
  styleUrl: './ad-container.component.scss',
})
export class AdContainerComponent implements OnInit {
  @Input() slotId1?: number;
  @Input() slotId2?: number;

  private platformId = inject(PLATFORM_ID);
  // Mobile detection
  isMobile = false;

  ngOnInit(): void {
    this.checkIfMobile();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkIfMobile();
  }

  private checkIfMobile(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isMobile = window.innerWidth <= 768;
  }

  // Show double container if: not mobile AND both configs are set
  get showDoubleContainer(): boolean {
    return !this.isMobile && !!this.slotId1 && !!this.slotId2;
  }

  // Show single container if: mobile OR only first config is set (and second is not)
  get showSingleContainer(): boolean {
    return this.isMobile || (!!this.slotId1 && !this.slotId2);
  }
}
