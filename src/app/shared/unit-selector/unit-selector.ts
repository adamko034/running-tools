import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GuiConfigService } from '../../core/services/gui-config.service';

@Component({
  selector: 'app-unit-selector',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './unit-selector.html',
  styleUrl: './unit-selector.scss',
})
export class UnitSelector {
  private guiConfigService = inject(GuiConfigService);

  unit = this.guiConfigService.distanceUnit;

  onUnitChange(newValue: 'km' | 'mi') {
    this.guiConfigService.setDistanceUnit(newValue);
  }
}
