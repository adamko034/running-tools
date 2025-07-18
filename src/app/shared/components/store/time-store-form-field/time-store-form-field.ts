import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Time } from '../../../../core/business/model/time.model';
import { StoreService } from '../../../../core/store/store.service';
import { SelectOnFocus } from '../../../directives/select-on-focus';
import { FormField } from '../../ui/form-field/form-field';

@Component({
  selector: 'app-time-store-form-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    SelectOnFocus,
    FormField,
    TranslateModule,
  ],
  templateUrl: './time-store-form-field.html',
})
export class TimeStoreFormField {
  private store = inject(StoreService);
  private time = this.store.time;

  public hours = this.time().hours;
  public minutes = this.time().minutes;
  public seconds = this.time().seconds;

  constructor() {
    effect(() => {
      const { hours, minutes, seconds } = this.time();
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    });
  }

  onTimeChange() {
    const newTime = Time.of(this.hours, this.minutes, this.seconds);
    newTime.validate();

    this.store.updateTime(newTime);
  }
}
