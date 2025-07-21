import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StructuredDataService } from '../../../core/services/structured-data.service';

@Component({
  selector: 'app-tool-view',
  imports: [CommonModule],
  templateUrl: './tool-view.html',
})
export class ToolView implements OnInit, OnDestroy {
  @Input() showSummary = true;
  @Input() calculatorName?: string;
  @Input() calculatorDescription?: string;

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
