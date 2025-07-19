import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ResultBoxType } from './result-box-type.enum';

@Component({
  selector: 'app-result-box',
  imports: [MatIconModule, CommonModule],
  templateUrl: './result-box.html',
})
export class ResultBox {
  @Input() type: ResultBoxType = ResultBoxType.INFO;
  @Input() showIcon = true;

  get icon(): string {
    switch (this.type) {
      case 'bad':
        return 'error_outline';
      case 'could_improve':
        return 'warning';
      case 'ok':
        return 'check_circle';
      case 'excellent':
        return 'emoji_events';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }
  get colorClass(): string {
    switch (this.type) {
      case 'bad':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'could_improve':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'ok':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'excellent':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'info':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }

  get iconBackgroundClass(): string {
    switch (this.type) {
      case 'bad':
        return 'bg-red-100 text-red-600';
      case 'could_improve':
        return 'bg-amber-100 text-amber-600';
      case 'ok':
        return 'bg-emerald-100 text-emerald-600';
      case 'excellent':
        return 'bg-green-100 text-green-600';
      case 'info':
        return 'bg-blue-200 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  }
}
