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
        { text: 'finish time predictor', link: 'race/finish-time-predictor' },
      ],
    },
    {
      title: 'personal',
      links: [
        { text: 'burned calories', link: 'personal/burned-calories-estimator' },
        { text: 'VO₂max', link: 'personal/vo2max-calculator' },
      ],
    },
    {
      title: 'units',
      links: [
        { text: 'pace / speed', link: 'units/pace-to-speed' },
        // {
        //   text: 'kilometers / miles',
        //   link: 'units/kilometers-miles-converter',
        // },
      ],
    },
  ];
}
