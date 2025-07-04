import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Navigation } from '../core/navigation/navigation.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  navigation: Navigation[] = [
    {
      title: 'Race Tools',
      links: [
        {
          text: 'Pace Calculator',
          link: 'race/pace-calculator',
          description: 'Calculate pace from distance and time',
          icon: 'speed',
        },
        {
          text: 'Finish Time Predictor',
          link: 'race/finish-time-predictor',
          description: 'Predict race finish times based on current performance',
          icon: 'flag',
        },
      ],
    },
    {
      title: 'Personal Performance',
      links: [
        {
          text: 'Calories Burned Calculator',
          link: 'personal/burned-calories-estimator',
          description: 'Calculate calories burned during your runs',
          icon: 'local_fire_department',
        },
        {
          text: 'VO₂ Max Calculator',
          link: 'personal/vo2max-calculator',
          description: 'Estimate your maximum oxygen uptake',
          icon: 'favorite',
        },
      ],
    },
    {
      title: 'Unit Converters',
      links: [
        {
          text: 'Pace / Speed Converter',
          link: 'units/pace-to-speed',
          description: 'Convert between pace and speed units',
          icon: 'swap_horiz',
        },
        {
          text: 'Distance Converter',
          link: 'units/kilometers-to-miles',
          description: 'Convert between kilometers and miles',
          icon: 'straighten',
        },
        {
          text: 'Weight Converter',
          link: 'units/kilograms-to-pounds',
          description: 'Convert between kilograms and pounds',
          icon: 'fitness_center',
        },
      ],
    },
  ];
}
