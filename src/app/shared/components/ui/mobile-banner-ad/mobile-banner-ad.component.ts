import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAdComponent } from '../google-ad/google-ad.component';

@Component({
  selector: 'app-mobile-banner-ad',
  standalone: true,
  imports: [CommonModule, GoogleAdComponent],
  template: `
    <div class="block lg:hidden w-full py-4">
      <div class="text-center mb-2">
        <span class="text-xs text-gray-500 uppercase tracking-wide">
          Advertisement
        </span>
      </div>
      <app-google-ad 
        [adSlot]="adSlot"
        adFormat="auto"
        [fullWidthResponsive]="true"
        minHeight="90px">
      </app-google-ad>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class MobileBannerAdComponent {
  @Input() adSlot: string = '9012345678';
}