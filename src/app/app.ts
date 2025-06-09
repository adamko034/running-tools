import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { UnitSelector } from './shared/unit-selector/unit-selector';

@Component({
  selector: 'app-root',
  imports: [MatListModule, MatIconModule, RouterModule, UnitSelector],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'running-tools';
}
