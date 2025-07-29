import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAdComponent } from '../google-ad/google-ad.component';

@Component({
  selector: 'app-sidebar-ad',
  standalone: true,
  imports: [CommonModule, GoogleAdComponent],
  template: `
    <div class="hidden lg:block sticky top-4">
      <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 class="text-sm font-medium text-gray-600 mb-3 text-center">
          {{ title }}
        </h4>
        <app-google-ad 
          [adSlot]="adSlot"
          adFormat="rectangle"
          [fullWidthResponsive]="false"
          minHeight="250px">
        </app-google-ad>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class SidebarAdComponent {
  @Input() adSlot: string = '1234567890';
  @Input() title: string = 'Sponsored';
}