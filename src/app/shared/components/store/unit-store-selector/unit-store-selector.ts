import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { StoreService } from '../../../../core/store/store.service';
import { Units } from '../../../../core/store/units.enum';

@Component({
  selector: 'app-unit-store-selector',
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './unit-store-selector.html',
})
export class UnitStoreSelector {
  private store = inject(StoreService);
  units = Units;

  onUnitChange(newUnits: Units) {
    this.store.updateUnits(newUnits);
  }
}
