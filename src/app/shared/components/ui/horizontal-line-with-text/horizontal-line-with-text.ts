import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-line-with-text',
  templateUrl: './horizontal-line-with-text.html',
})
export class HorizontalLineWithText {
  @Input() text = '';
}
