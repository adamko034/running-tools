import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HorizontalLineWithText } from '../horizontal-line-with-text/horizontal-line-with-text';

@Component({
  selector: 'app-form-field',
  imports: [HorizontalLineWithText, CommonModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormField {
  @Input() showHorizontalLine = true;
  @Input() horizontalLineText = '';
}
