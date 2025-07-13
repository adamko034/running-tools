import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Pace } from '../../../../core/business/model/pace.model';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-pace-store-form-field',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    SelectOnFocus,
    FormField,
    TranslateModule,
  ],
  templateUrl: './pace-store-form-field.html',
})
export class PaceStoreFormField {
  private store = inject(StoreService);
  pace = computed(() => this.store.pace());

  onPaceChange(value: number, minOrSec: 'min' | 'sec') {
    const newPace = Pace.of(
      minOrSec === 'min' ? value : this.pace().minutes,
      minOrSec === 'sec' ? value : this.pace().seconds,
      this.pace().unit
    );
    this.store.updatePace(newPace);
  }
}
