import { Component, computed, inject } from '@angular/core';
import { StoreService } from '../../../core/store/store.service';
import { GreenBox } from '../../../shared/green-box/green-box';
import { PaceFormField } from '../../../shared/pace-form-field/pace-form-field';
import { SpeedFormField } from '../../../shared/speed-form-field/speed-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-pace-to-speed',
  imports: [ToolView, PaceFormField, SpeedFormField, GreenBox],
  templateUrl: './pace-to-speed.html',
  styleUrl: './pace-to-speed.scss',
})
export class PaceToSpeed {
  private store = inject(StoreService);

  pace = this.store.pace;
  speed = computed(() => this.store.pace().toSpeed());
}
