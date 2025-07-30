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
        bg: 'bg-race-gradient',
        border: 'border-race'
      },
      personal: {
        bg: 'bg-personal-gradient',
        border: 'border-personal'
      },
      training: {
        bg: 'bg-training-gradient',
        border: 'border-training'
      },
      units: {
        bg: 'bg-units-gradient',
        border: 'border-units'
      },
    };
    return styleMap[this.category || 'race'];
  }

  getCategoryIconStyles(): string {
    const styleMap = {
      'race': 'bg-race-icon',
      'personal': 'bg-personal-icon',
      'training': 'bg-training-icon',
      'units': 'bg-units-icon'
    };
    return styleMap[this.category || 'race'];
  }

  getCategoryBadgeStyles(): string {
    const styleMap = {
      'race': 'badge-race',
      'personal': 'badge-personal',
      'training': 'badge-training',
      'units': 'badge-units'
    };
    return styleMap[this.category || 'race'];
  }

  getCategoryDividerStyles(): string {
    const styleMap = {
      'race': 'divider-race',
      'personal': 'divider-personal',
      'training': 'divider-training',
      'units': 'divider-units'
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
