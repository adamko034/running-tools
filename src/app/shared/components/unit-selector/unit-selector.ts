import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StoreService } from '../../../core/store/store.service';
import { Units } from '../../../core/store/units.enum';

@Component({
  selector: 'app-unit-selector',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './unit-selector.html',
  styleUrl: './unit-selector.scss',
})
export class UnitSelector {
  private store = inject(StoreService);
  units = this.store.units;

  onUnitChange(newUnits: Units) {
    this.store.updateUnits(newUnits);
  }
}
