import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Speed } from '../../../core/business/model/speed.model';
import { NumberFormField } from '../number-form-field/number-form-field';

@Component({
  selector: 'app-speed-form-field',
  imports: [NumberFormField],
  templateUrl: './speed-form-field.html',
  styleUrl: './speed-form-field.scss',
})
export class SpeedFormField {
  @Input() speed!: Speed;

  @Output() speedChange = new EventEmitter<Speed>();

  onSpeedChange(newValue: number) {
    this.speed.value = newValue;
    this.speedChange.emit(this.speed);
  }
}
