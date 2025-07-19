import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-race-time-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './race-time-card.html',
})
export class RaceTimeCard {}