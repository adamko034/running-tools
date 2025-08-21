import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss',
})
export class DisclaimerComponent implements OnInit {
  lastUpdated = 'August 2025';
  currentYear = new Date().getFullYear();

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateDisclaimerMeta();
  }
}
