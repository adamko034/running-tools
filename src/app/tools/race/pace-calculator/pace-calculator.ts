import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DistanceStoreFormField } from '../../../shared/components/store/distance-store-form-field/distance-store-form-field';
import { PaceStoreFormField } from '../../../shared/components/store/pace-store-form-field/pace-store-form-field';
import { TimeStoreFormField } from '../../../shared/components/store/time-store-form-field/time-store-form-field';
import { GreenBox } from '../../../shared/components/ui/green-box/green-box';
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
    DistanceStoreFormField,
    TimeStoreFormField,
    PaceStoreFormField,
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
