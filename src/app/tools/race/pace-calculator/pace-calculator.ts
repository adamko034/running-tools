import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DistanceFormField } from '../../../shared/components/distance-form-field/distance-form-field';
import { GreenBox } from '../../../shared/components/green-box/green-box';
import { PaceFormField } from '../../../shared/components/pace-form-field/pace-form-field';
import { TimeFormField } from '../../../shared/components/time-form-field/time-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';
import { Store } from './../../../core/store/store.model';
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
  private storeService = inject(StoreService);

  summary = computed(() => this.getSummary(this.storeService.store()));

  private getSummary(store: Store) {
    const { distance, time, pace } = store;
    const timeFormatted = time.format();
    const paceFormatted = pace.format();

    return `${distance.value} ${distance.unit} • ${timeFormatted} • ${paceFormatted}`;
  }
}
