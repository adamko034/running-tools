import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { DataCatalog } from '../../../../core/business/catalog/data-catalog';
import { Distance } from '../../../../core/business/model/distance.model';
import { DistanceUnit } from '../../../../core/business/model/enums/distance-unit.enum';
import { MathUtils } from '../../../../core/utils/math.utils';

@Component({
  selector: 'app-select-race-distance',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './select-race-distance.html',
})
export class SelectRaceDistance {
  @Input() value = 0;
  @Input() unit: DistanceUnit = DistanceUnit.KM;

  @Output() distanceSelected = new EventEmitter<Distance>();

  distancesKeys = DataCatalog.distancesKeys;
  distances = DataCatalog.distances;

  onDistanceSelected(selected: number) {
    this.value = selected;
    const value =
      this.unit === DistanceUnit.KM
        ? selected
        : MathUtils.convertToMi(selected);
    this.distanceSelected.emit(Distance.of(value, this.unit));
  }
}
