import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Navigation } from './core/navigation/navigation.model';
import { UnitSelector } from './shared/unit-selector/unit-selector';

@Component({
  selector: 'app-root',
  imports: [MatListModule, MatIconModule, RouterModule, UnitSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'running-tools';

  navigation: Navigation[] = [
    {
      title: 'race',
      links: [
        { text: 'pace / time / distance', link: 'race/pace-calculator' },
        { text: 'race times', link: 'race/race-times-table' },
        { text: 'race time estimation', link: 'race/race-time-estimation' },
      ],
    },
    {
      title: 'personal',
      links: [
        { text: 'VO₂max', link: 'personal/vo2max-calculator' },
        { text: 'BMI', link: 'personal/bmi-calculator' },
      ],
    },
    {
      title: 'units',
      links: [
        { text: 'pace / speed', link: 'units/pace-speed-converter' },
        {
          text: 'kilometers / miles',
          link: 'units/kilometers-miles-converter',
        },
      ],
    },
  ];
}
