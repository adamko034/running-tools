import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Speed } from '../../core/business/model/speed.model';
import { StoreService } from '../../core/store/store.service';
import { SelectOnFocus } from '../directives/select-on-focus';
import { FormField } from '../form-field/form-field';

@Component({
  selector: 'app-speed-form-field',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    SelectOnFocus,
    FormField,
  ],
  templateUrl: './speed-form-field.html',
  styleUrl: './speed-form-field.scss',
})
export class SpeedFormField {
  private store = inject(StoreService);

  speed = computed(() => this.store.pace().toSpeed());

  onSpeedChange(newValue: number) {
    const newSpeed = Speed.of(newValue, this.speed().units);
    this.store.updatePace(newSpeed.toPace());
  }
}
