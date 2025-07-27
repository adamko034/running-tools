import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DataCatalog } from '../../core/business/catalog/data-catalog';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    TranslateModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);
  private seoService = inject(SeoService);

  readonly email = DataCatalog.EMAIL;
  supportedLanguages = ['English', 'Polish'];

  constructor() {
    this.setupSeo();
  }

  private setupSeo(): void {
    this.seoService.updateContactMeta();
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      const message = this.translateService.instant('contact.email_copied');
      this.snackBar.open(message, '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      });
    } catch (err) {
      // Fallback for older browsers
      this.fallbackCopyEmail();
    }
  }

  private fallbackCopyEmail(): void {
    const textArea = document.createElement('textarea');
    textArea.value = this.email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      const message = this.translateService.instant('contact.email_copied');
      this.snackBar.open(message, '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar'],
      });
    } catch (err) {
      const message = this.translateService.instant('contact.copy_failed');
      this.snackBar.open(message, '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar'],
      });
    } finally {
      document.body.removeChild(textArea);
    }
  }

  openEmailClient(): void {
    const subject = encodeURIComponent('Runner Toolkit - Inquiry');
    const body = encodeURIComponent(`Hello,

I would like to inquire about:
[ ] Bug or technical issue
[ ] GDPR/RODO data protection request
[ ] General question

Please describe your inquiry below:


Best regards`);

    window.location.href = `mailto:${this.email}?subject=${subject}&body=${body}`;
  }
}
