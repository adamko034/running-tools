import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-view',
  imports: [CommonModule],
  templateUrl: './tool-view.html',
})
export class ToolView {
  @Input() showSummary = true;
}
