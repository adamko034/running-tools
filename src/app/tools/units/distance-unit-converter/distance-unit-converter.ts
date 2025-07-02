import { Component, inject } from '@angular/core';
import { Distance } from '../../../core/business/model/distance.model';
import { DistanceUnit } from '../../../core/business/model/enums/distance-unit.enum';
import { StoreService } from '../../../core/store/store.service';
import { SelectRaceDistance } from '../../../shared/components/business/select-race-distance/select-race-distance';
import { GreenBox } from '../../../shared/components/ui/green-box/green-box';
import { NumberFormField } from '../../../shared/components/ui/number-form-field/number-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-distance-unit-converter',
  imports: [ToolView, GreenBox, NumberFormField, SelectRaceDistance],
  templateUrl: './distance-unit-converter.html',
  styleUrl: './distance-unit-converter.scss',
})
export class DistanceUnitConverter {
  private store = inject(StoreService);

  kmDistance = this.store.distance().clone();
  miDistance = this.kmDistance.cloneAndConvert(DistanceUnit.MI);
  selectedKmDistance = this.kmDistance.value;

  onKmDistanceChange(
    newValue: number,
    fromSelection: boolean | undefined = undefined,
  ) {
    this.kmDistance.value = newValue;
    this.miDistance.setValueAndConvert(newValue);

    if (!fromSelection) {
      this.selectedKmDistance = 0;
    }
  }

  onKmDistanceSelected(selected: Distance) {
    this.onKmDistanceChange(selected.value, true);
  }

  onMiDistanceChange(
    newValue: number,
    fromSelection: boolean | undefined = undefined,
  ) {
    this.miDistance.value = newValue;
    this.kmDistance.setValueAndConvert(newValue);

    if (!fromSelection) {
      this.selectedKmDistance = 0;
    }
  }

  onMiDistanceSelected(selected: Distance) {
    this.onMiDistanceChange(selected.value, true);
  }
}
