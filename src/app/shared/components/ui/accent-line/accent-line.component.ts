import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accent-line',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-3 flex items-center justify-center space-x-2">
      <div class="w-2 h-2 rounded-full" [ngClass]="getPrimaryAccentClasses()"></div>
      <div class="w-16 h-1 rounded-full" [ngClass]="getGradientClasses()"></div>
      <div class="w-2 h-2 rounded-full" [ngClass]="getSecondaryAccentClasses()"></div>
    </div>
  `
})
export class AccentLineComponent {
  @Input() colorScheme: 'blue-green' | 'emerald' | 'amber' | 'red' | 'green' = 'blue-green';

  getPrimaryAccentClasses(): string {
    switch (this.colorScheme) {
      case 'blue-green':
        return 'bg-blue-500';
      case 'emerald':
        return 'bg-emerald-500';
      case 'amber':
        return 'bg-amber-500';
      case 'red':
        return 'bg-red-500';
      case 'green':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  }

  getSecondaryAccentClasses(): string {
    switch (this.colorScheme) {
      case 'blue-green':
        return 'bg-green-500';
      case 'emerald':
        return 'bg-teal-500';
      case 'amber':
        return 'bg-orange-500';
      case 'red':
        return 'bg-pink-500';
      case 'green':
        return 'bg-emerald-500';
      default:
        return 'bg-green-500';
    }
  }

  getGradientClasses(): string {
    switch (this.colorScheme) {
      case 'blue-green':
        return 'bg-gradient-to-r from-blue-500 to-green-500';
      case 'emerald':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      case 'amber':
        return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case 'red':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'green':
        return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default:
        return 'bg-gradient-to-r from-blue-500 to-green-500';
    }
  }
}