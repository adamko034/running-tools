import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { GuiConfigService } from '../../core/services/gui-config.service';
import { SelectOnFocus } from '../directives/select-on-focus';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';

@Component({
  selector: 'app-distance-form-field',
  imports: [
    HorizontalLineWithText,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    SelectOnFocus,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './distance-form-field.html',
  styleUrl: './distance-form-field.scss',
})
export class DistanceFormField {
  @Input() value = 0;
  @Input() showHorizontalLine = true;

  @Output() distanceChange = new EventEmitter<number>();

  private guiConfigService = inject(GuiConfigService);
  unit = this.guiConfigService.distanceUnit;

  setDistance(kmValue: number) {
    const currentUnit = this.unit();
    const converted =
      currentUnit === 'mi' ? this.convertKmToMi(kmValue) : kmValue;
    this.value = Math.round(converted * 1000) / 1000;
    this.onDistanceChange();
  }

  private convertKmToMi(km: number): number {
    return km * 0.621371;
  }

  onDistanceChange() {
    this.distanceChange.emit(this.value);
  }
}
