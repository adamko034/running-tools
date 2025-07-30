import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AD_SLOTS } from '../../../core/config/ad-slots.config';
import { StructuredDataService } from '../../../core/services/structured-data.service';
import { GoogleAdComponent } from '../../components/ui/google-ad/google-ad.component';

@Component({
  selector: 'app-tool-view',
  imports: [CommonModule, GoogleAdComponent, MatIconModule],
  templateUrl: './tool-view.html',
})
export class ToolView implements OnInit, OnDestroy {
  @Input() showSummary = true;
  @Input() calculatorName?: string;
  @Input() calculatorDescription?: string;
  @Input() category?: 'race' | 'personal' | 'training' | 'units';

  // Ad slots from config
  readonly adSlots = AD_SLOTS;

  get categoryStyles() {
    const styleMap = {
      race: {
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
        border: 'border-blue-200',
        accent: 'from-blue-400 to-blue-600',
        title: 'text-blue-900',
        description: 'text-blue-700',
        divider: 'from-transparent via-blue-300 to-transparent',
      },
      personal: {
        bg: 'bg-gradient-to-br from-green-50 to-green-100',
        border: 'border-green-200',
        accent: 'from-green-400 to-green-600',
        title: 'text-green-900',
        description: 'text-green-700',
        divider: 'from-transparent via-green-300 to-transparent',
      },
      training: {
        bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
        border: 'border-purple-200',
        accent: 'from-purple-400 to-purple-600',
        title: 'text-purple-900',
        description: 'text-purple-700',
        divider: 'from-transparent via-purple-300 to-transparent',
      },
      units: {
        bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
        border: 'border-orange-200',
        accent: 'from-orange-400 to-orange-600',
        title: 'text-orange-900',
        description: 'text-orange-700',
        divider: 'from-transparent via-orange-300 to-transparent',
      },
    };
    return styleMap[this.category || 'race'];
  }

  getCategoryIconStyles(): string {
    const styleMap = {
      race: 'bg-gradient-to-br from-blue-500 to-blue-600',
      personal: 'bg-gradient-to-br from-green-500 to-green-600',
      training: 'bg-gradient-to-br from-purple-500 to-purple-600',
      units: 'bg-gradient-to-br from-orange-500 to-orange-600',
    };
    return styleMap[this.category || 'race'];
  }

  getCategoryGradientStyles(): string {
    const styleMap = {
      race: 'from-blue-600 to-blue-800',
      personal: 'from-green-600 to-green-800',
      training: 'from-purple-600 to-purple-800',
      units: 'from-orange-600 to-orange-800',
    };
    return styleMap[this.category || 'race'];
  }

  getCategoryBadgeStyles(): string {
    const styleMap = {
      race: 'bg-blue-100 text-blue-700',
      personal: 'bg-green-100 text-green-700',
      training: 'bg-purple-100 text-purple-700',
      units: 'bg-orange-100 text-orange-700',
    };
    return styleMap[this.category || 'race'];
  }

  getCategoryDividerStyles(): string {
    const styleMap = {
      race: 'from-transparent via-blue-400 to-transparent',
      personal: 'from-transparent via-green-400 to-transparent',
      training: 'from-transparent via-purple-400 to-transparent',
      units: 'from-transparent via-orange-400 to-transparent',
    };
    return styleMap[this.category || 'race'];
  }

  getCategoryIcon(): string {
    const iconMap = {
      race: 'flag',
      personal: 'person',
      training: 'fitness_center',
      units: 'swap_horiz',
    };
    return iconMap[this.category || 'race'];
  }

  getToolIcon(): string {
    const iconMap = {
      race: 'speed',
      personal: 'person',
      training: 'fitness_center',
      units: 'swap_horiz',
    };
    return iconMap[this.category || 'race'];
  }

  getCategoryDisplayName(): string {
    const nameMap = {
      race: 'Race Tools',
      personal: 'Personal Tools',
      training: 'Training',
      units: 'Unit Converters',
    };
    return nameMap[this.category || 'race'];
  }

  private structuredDataService = inject(StructuredDataService);
  private router = inject(Router);

  ngOnInit(): void {
    // Add calculator schema if provided
    if (this.calculatorName && this.calculatorDescription) {
      const currentUrl = `https://runner-toolkit.web.app${this.router.url}`;
      this.structuredDataService.addCalculatorSchema(
        this.calculatorName,
        this.calculatorDescription,
        currentUrl
      );
    }
  }

  ngOnDestroy(): void {
    this.structuredDataService.cleanup();
  }
}
