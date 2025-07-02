import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Speed } from '../../../../core/business/model/speed.model';
import { NumberFormField } from '../../ui/number-form-field/number-form-field';

@Component({
  selector: 'app-speed-pure-form-field',
  imports: [NumberFormField],
  templateUrl: './speed-pure-form-field.html',
})
export class SpeedPureFormField {
  @Input() speed!: Speed;

  @Output() speedChange = new EventEmitter<Speed>();

  onSpeedChange(newValue: number) {
    this.speed.value = newValue;
    this.speedChange.emit(this.speed);
  }
}
