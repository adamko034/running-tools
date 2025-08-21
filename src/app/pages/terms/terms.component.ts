import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss',
})
export class TermsComponent implements OnInit {
  lastUpdated = 'August 2025';
  currentYear = new Date().getFullYear();

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateTermsOfServiceMeta();
  }
}
