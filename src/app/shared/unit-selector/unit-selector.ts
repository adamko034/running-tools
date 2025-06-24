import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DistanceUnit } from '../../core/models/distance-unit.enum';
import { WeightUnit } from '../../core/models/weight-unit.enum';
import { StoreService } from '../../core/store/store.service';
import { Units } from '../../core/store/units.model';

@Component({
  selector: 'app-unit-selector',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './unit-selector.html',
  styleUrl: './unit-selector.scss',
})
export class UnitSelector {
  private store = inject(StoreService);
  value = computed(() =>
    this.store.distanceUnit() == DistanceUnit.KM ? 'eu' : 'en',
  );

  onUnitChange(newValue: 'eu' | 'en') {
    const units = this.unitsFromValue(newValue);
    this.store.updateUnits(units);
  }

  private unitsFromValue(newValue: 'eu' | 'en'): Units {
    if (newValue === 'eu') {
      return { distance: DistanceUnit.KM, weight: WeightUnit.KG };
    }

    return { distance: DistanceUnit.MI, weight: WeightUnit.LB };
  }
}
