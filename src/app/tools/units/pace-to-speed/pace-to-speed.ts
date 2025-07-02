import { Component, effect, inject } from '@angular/core';
import { Pace } from '../../../core/business/model/pace.model';
import { Speed } from '../../../core/business/model/speed.model';
import { StoreService } from '../../../core/store/store.service';
import { GreenBox } from '../../../shared/green-box/green-box';
import { PaceInputsFormField } from '../../../shared/pace-inputs-form-field/pace-inputs-form-field';
import { SpeedFormField } from '../../../shared/speed-form-field/speed-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-pace-to-speed',
  imports: [ToolView, GreenBox, PaceInputsFormField, SpeedFormField],
  templateUrl: './pace-to-speed.html',
  styleUrl: './pace-to-speed.scss',
})
export class PaceToSpeed {
  private store = inject(StoreService);

  pace = this.store.pace();
  speed = this.pace.toSpeed();

  constructor() {
    effect(() => {
      this.pace = this.store.pace();
      this.speed = this.pace.toSpeed();
    });
  }

  onSpeedChange(newSpeed: Speed) {
    this.speed = newSpeed;
    this.pace = this.speed.toPace();
  }

  onPaceChange(newPace: Pace) {
    this.pace = newPace;
    this.speed = this.pace.toSpeed();
  }
}
