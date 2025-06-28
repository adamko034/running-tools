import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreService } from '../../core/store/store.service';
import { SelectOnFocus } from '../directives/select-on-focus';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';

@Component({
  selector: 'app-pace-form-field',
  imports: [
    HorizontalLineWithText,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SelectOnFocus,
  ],
  templateUrl: './pace-form-field.html',
  styleUrl: './pace-form-field.scss',
})
export class PaceFormField {
  @Input() showHorizontalLine = true;

  private store = inject(StoreService);
  pace = this.store.pace;

  onPaceChange() {
    this.store.updatePace(this.pace());
  }
}
