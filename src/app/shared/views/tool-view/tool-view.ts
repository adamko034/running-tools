import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StructuredDataService } from '../../../core/services/structured-data.service';
import { GoogleAdComponent } from '../../components/ui/google-ad/google-ad.component';
import { SidebarAdComponent } from '../../components/ui/sidebar-ad/sidebar-ad.component';
import { AD_SLOTS } from '../../../core/config/ad-slots.config';

@Component({
  selector: 'app-tool-view',
  imports: [
    CommonModule, 
    GoogleAdComponent, 
    SidebarAdComponent
  ],
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
      'race': {
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
        border: 'border-blue-200',
        accent: 'from-blue-400 to-blue-600',
        title: 'text-blue-900',
        description: 'text-blue-700',
        divider: 'from-transparent via-blue-300 to-transparent'
      },
      'personal': {
        bg: 'bg-gradient-to-br from-green-50 to-green-100',
        border: 'border-green-200',
        accent: 'from-green-400 to-green-600',
        title: 'text-green-900',
        description: 'text-green-700',
        divider: 'from-transparent via-green-300 to-transparent'
      },
      'training': {
        bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
        border: 'border-purple-200',
        accent: 'from-purple-400 to-purple-600',
        title: 'text-purple-900',
        description: 'text-purple-700',
        divider: 'from-transparent via-purple-300 to-transparent'
      },
      'units': {
        bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
        border: 'border-orange-200',
        accent: 'from-orange-400 to-orange-600',
        title: 'text-orange-900',
        description: 'text-orange-700',
        divider: 'from-transparent via-orange-300 to-transparent'
      }
    };
    return styleMap[this.category || 'race'];
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
