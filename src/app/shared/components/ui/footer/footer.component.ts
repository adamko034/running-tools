import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DataCatalog } from '../../../../core/business/catalog/data-catalog';
import { AccentLineComponent } from '../accent-line/accent-line.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
    AccentLineComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  readonly currentYear = new Date().getFullYear();
  readonly email = DataCatalog.EMAIL;
  readonly createdBy = 'elioapps';
  readonly version = '2.1.0'; // You can make this dynamic later

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.addStructuredData();
    }
  }

  private addStructuredData(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Runner Toolkit",
      "url": window.location.origin,
      "description": "Professional running calculators and tools for athletes. Calculate pace, predict finish times, track training zones, and convert units.",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": this.email,
        "contactType": "customer service",
        "availableLanguage": ["English", "Polish"]
      },
      "founder": {
        "@type": "Person",
        "name": this.createdBy
      },
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  openEmailClient(): void {
    const subject = encodeURIComponent('Runner Toolkit - General Inquiry');
    window.location.href = `mailto:${this.email}?subject=${subject}`;
  }
}