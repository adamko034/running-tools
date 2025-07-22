import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-version-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="version-display">
      <span class="version-text">v{{ version }}</span>
    </div>
  `,
  styles: [`
    .version-display {
      text-align: center;
      padding: 8px;
    }
    
    .version-text {
      font-size: 12px;
      color: #666;
      font-weight: 400;
      opacity: 0.7;
    }
    
    .version-text:hover {
      opacity: 1;
      transition: opacity 0.2s ease;
    }
  `]
})
export class VersionDisplayComponent {
  version = environment.version || '1.0.0';
}