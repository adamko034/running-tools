import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GuiConfigService } from '../../core/services/gui-config.service';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';

@Component({
  selector: 'app-distance-form-field',
  imports: [
    HorizontalLineWithText,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './distance-form-field.html',
  styleUrl: './distance-form-field.scss',
})
export class DistanceFormField {
  @Input() value = 0;
  @Input() showHorizontalLine = true;

  @Output() distanceChange = new EventEmitter<number>();

  private guiConfigService = inject(GuiConfigService);
  suffix = this.guiConfigService.distanceUnit;

  onDistanceChange() {
    this.distanceChange.emit(this.value);
  }
}
