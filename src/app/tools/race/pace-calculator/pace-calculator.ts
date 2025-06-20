import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DistanceFormField } from '../../../shared/distance-form-field/distance-form-field';
import { GreenBox } from '../../../shared/green-box/green-box';
import { PaceFormField } from '../../../shared/pace-form-field/pace-form-field';
import { TimeFormField } from '../../../shared/time-form-field/time-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';
import { StoreService } from './../../../core/store/store.service';

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
    ToolView,
    GreenBox,
  ],
  templateUrl: './pace-calculator.html',
  styleUrl: './pace-calculator.scss',
  standalone: true,
})
export class PaceCalculator {
  summary = '';

  private storeService = inject(StoreService);
  private store = this.storeService.store;

  constructor() {
    effect(() => this.setSummary());
  }

  private setSummary() {
    const { distance, distanceUnit, time, pace } = this.store();
    const timeFormatted = time.format();
    const paceFormatted = pace.format(distanceUnit);

    this.summary = `${distance} ${distanceUnit} • ${timeFormatted} • ${paceFormatted}`;
  }
}
