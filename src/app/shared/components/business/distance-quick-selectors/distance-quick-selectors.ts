import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-distance-quick-selectors',
  imports: [TranslateModule, CommonModule],
  templateUrl: './distance-quick-selectors.html',
})
export class DistanceQuickSelectors {
  @Input() selectedDistance = 0;
  @Output() distanceSelected = new EventEmitter<number>();

  onDistanceSelect(kmValue: number) {
    this.distanceSelected.emit(kmValue);
  }

  isSelected(kmValue: number): boolean {
    return Math.abs(this.selectedDistance - kmValue) < 0.001;
  }
}
