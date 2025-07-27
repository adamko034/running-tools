import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccentLineComponent } from '../accent-line/accent-line.component';

@Component({
  selector: 'app-fancy-result',
  standalone: true,
  imports: [CommonModule, AccentLineComponent],
  templateUrl: './fancy-result.html',
})
export class FancyResult {
  @Input() variant: 'default' | 'compact' | 'card' = 'default';
  @Input() colorScheme: 'blue-green' | 'emerald' | 'amber' | 'red' | 'green' =
    'blue-green';
  @Input() transparentValue: boolean = false;

  getContainerClasses(): string {
    const baseClasses =
      this.getBackgroundClasses() +
      ' ' +
      this.getBorderClasses() +
      ' ' +
      this.getPaddingClasses();
    return baseClasses;
  }

  getBackgroundClasses(): string {
    switch (this.colorScheme) {
      case 'blue-green':
        return 'bg-gradient-to-br from-blue-100 via-blue-200 to-green-100';
      case 'emerald':
        return 'bg-gradient-to-br from-emerald-100 via-emerald-200 to-teal-100';
      case 'amber':
        return 'bg-gradient-to-br from-amber-100 via-amber-200 to-orange-100';
      case 'red':
        return 'bg-gradient-to-br from-red-100 via-red-200 to-pink-100';
      case 'green':
        return 'bg-gradient-to-br from-green-300 via-green-400 to-emerald-100';
      default:
        return 'bg-gradient-to-br from-blue-100 via-blue-200 to-green-100';
    }
  }

  getBorderClasses(): string {
    switch (this.colorScheme) {
      case 'blue-green':
        return 'border-blue-200';
      case 'emerald':
        return 'border-emerald-200';
      case 'amber':
        return 'border-amber-200';
      case 'red':
        return 'border-red-200';
      case 'green':
        return 'border-green-200';
      default:
        return 'border-blue-200';
    }
  }

  getPaddingClasses(): string {
    switch (this.variant) {
      case 'default':
        return 'p-8';
      case 'compact':
        return 'p-6';
      case 'card':
        return 'p-5';
      default:
        return 'p-8';
    }
  }

  getContentClasses(): string {
    return this.variant === 'card' ? '' : 'text-center';
  }

  getAccentClasses(): string {
    switch (this.colorScheme) {
      case 'blue-green':
        return 'from-blue-300/40';
      case 'emerald':
        return 'from-emerald-300/40';
      case 'amber':
        return 'from-amber-300/40';
      case 'red':
        return 'from-red-300/40';
      case 'green':
        return 'from-green-300/40';
      default:
        return 'from-blue-300/40';
    }
  }

  getAccentDotClasses(): string {
    switch (this.colorScheme) {
      case 'blue-green':
        return 'bg-blue-400/60';
      case 'emerald':
        return 'bg-emerald-400/60';
      case 'amber':
        return 'bg-amber-400/60';
      case 'red':
        return 'bg-red-400/60';
      case 'green':
        return 'bg-green-400/60';
      default:
        return 'bg-blue-400/60';
    }
  }

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
