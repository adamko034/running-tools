import { Component, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../../core/services/seo.service';
import { Pace } from '../../../core/business/model/pace.model';
import { Speed } from '../../../core/business/model/speed.model';
import { StoreService } from '../../../core/store/store.service';
import { PacePureFormField } from '../../../shared/components/business/pace-pure-form-field/pace-pure-form-field';
import { SpeedPureFormField } from '../../../shared/components/business/speed-pure-form-field/speed-pure-form-field';
import { FancyResult } from '../../../shared/components/ui/fancy-result/fancy-result';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-pace-to-speed',
  imports: [
    ToolView,
    FancyResult,
    PacePureFormField,
    SpeedPureFormField,
    TranslateModule,
  ],
  templateUrl: './pace-to-speed.html',
})
export class PaceToSpeed {
  private store = inject(StoreService);
  private seoService = inject(SeoService);

  pace = this.store.pace();
  speed = this.pace.toSpeed();

  constructor() {
    // Set SEO meta tags for pace to speed converter
    this.seoService.updatePaceToSpeedMeta();
    
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
