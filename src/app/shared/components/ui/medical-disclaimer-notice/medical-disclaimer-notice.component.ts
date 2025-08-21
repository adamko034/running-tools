import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-medical-disclaimer-notice',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex items-start">
        <mat-icon class="text-red-500 mr-3 mt-1 flex-shrink-0">medical_services</mat-icon>
        <div class="flex-1">
          <h3 class="text-red-800 font-semibold text-sm mb-2">Medical Disclaimer</h3>
          <p class="text-red-700 text-sm leading-relaxed mb-2">
            This calculator is for informational purposes only and is NOT medical advice. 
            Results may be inaccurate. Always consult healthcare professionals before making health decisions.
          </p>
          <a 
            routerLink="/disclaimer" 
            class="text-red-600 hover:text-red-800 underline text-sm font-medium"
          >
            Read full disclaimer →
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class MedicalDisclaimerNoticeComponent {}