import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UiService } from '../../../../core/services/ui.service';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule],
  templateUrl: './form-field.html',
})
export class FormField {
  @Input() showHorizontalLine = true;
  @Input() horizontalLineText = '';

  isMobileXs$ = inject(UiService).isMobileXs$;
}
