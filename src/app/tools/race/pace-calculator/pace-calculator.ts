import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GuiConfigService } from '../../../core/services/gui-config.service';
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
  summary = '';

  guiConfigService = inject(GuiConfigService);
  unit = this.guiConfigService.distanceUnit();

  constructor() {
    this.onTimeChange(this.time);
    effect(() => {
      this.unit = this.guiConfigService.distanceUnit();

      this.setSummary();
    });
  }

  onTimeChange(newValue: Time) {
    this.time = newValue;
    this.pace.calculate(this.time, this.distance);
    this.setSummary();
  }

  onDistanceChange(newValue: number) {
    this.distance = newValue;
    this.pace.calculate(this.time, this.distance);
    this.setSummary();
  }

  onPaceChange(newValue: Pace) {
    this.pace = newValue;
    this.time = this.pace.calculateTime(this.distance);
    this.setSummary();
  }

  private setSummary() {
    const distance = this.distance;
    const timeFormatted = this.time.format();
    const pace = this.pace.format(this.unit);

    if (!distance || !timeFormatted || !pace) this.summary = '';

    this.summary = `${distance} ${this.unit} • ${timeFormatted} • ${pace}`;
  }
}
