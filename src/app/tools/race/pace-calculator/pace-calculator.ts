import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DistanceFormField } from '../../../shared/distance-form-field/distance-form-field';
import { PaceFormField } from '../../../shared/pace-form-field/pace-form-field';
import { Pace } from '../../../shared/pace-form-field/pace.model';
import { TimeFormField } from '../../../shared/time-form-field/time-form-field';
import { Time } from '../../../shared/time-form-field/time.model';

@Component({
  selector: 'app-pace-calculator',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DistanceFormField,
    TimeFormField,
    PaceFormField,
  ],
  templateUrl: './pace-calculator.html',
  styleUrl: './pace-calculator.scss',
  standalone: true,
})
export class PaceCalculator {
  time: Time = Time.default();
  pace: Pace = Pace.default();
  distance: number = 10;

  constructor() {
    this.onTimeChange(this.time);
  }

  onTimeChange(newValue: Time) {
    this.time = newValue;
    this.pace.calculate(this.time, this.distance);
  }

  onDistanceChange(newValue: number) {
    this.distance = newValue;
    this.pace.calculate(this.time, this.distance);
  }

  onPaceChange(newValue: Pace) {
    this.pace = newValue;
    this.distance = this.pace.calculateDistance(this.time);
  }
}
