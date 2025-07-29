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

  // Ad slots from config
  readonly adSlots = AD_SLOTS;

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
