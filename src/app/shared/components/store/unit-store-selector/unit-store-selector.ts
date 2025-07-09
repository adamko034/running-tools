import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StoreService } from '../../../../core/store/store.service';
import { Units } from '../../../../core/store/units.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unit-store-selector',
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './unit-store-selector.html',
  styleUrl: './unit-store-selector.scss',
})
export class UnitStoreSelector {
  private store = inject(StoreService);
  units = Units;

  onUnitChange(newUnits: Units) {
    this.store.updateUnits(newUnits);
  }
}
