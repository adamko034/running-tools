import { Component } from '@angular/core';
import { DistanceFormField } from '../../../shared/distance-form-field/distance-form-field';
import { PaceFormField } from '../../../shared/pace-form-field/pace-form-field';
import { ToolView } from '../../../shared/views/tool-view/tool-view';
import { WeightFormField } from '../../../shared/weight-form-field/weight-form-field';

@Component({
  selector: 'app-calories-burned-calculator',
  imports: [ToolView, DistanceFormField, PaceFormField, WeightFormField],
  templateUrl: './calories-burned-calculator.html',
  styleUrl: './calories-burned-calculator.scss',
})
export class CaloriesBurnedCalculator {}
