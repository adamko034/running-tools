import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { UiService } from '../../../../core/services/ui.service';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';

@Component({
  selector: 'app-form-field',
  imports: [HorizontalLineWithText, CommonModule],
  templateUrl: './form-field.html',
})
export class FormField {
  @Input() showHorizontalLine = true;
  @Input() horizontalLineText = '';

  isMobileXs$ = inject(UiService).isMobileXs$;
}
