import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataCatalog } from '../../core/business/catalog/data-catalog';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent implements OnInit {
  readonly email = DataCatalog.EMAIL;
  readonly lastUpdated = '2025-07-27'; // Update this when you modify the policy

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setupSeo();
  }

  private setupSeo(): void {
    this.seoService.updatePrivacyPolicyMeta();
  }

}
