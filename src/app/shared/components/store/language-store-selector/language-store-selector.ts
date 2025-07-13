import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-language-store-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './language-store-selector.html',
})
export class LanguageStoreSelector {
  @Input() floatingIcon = false;

  private languageService = inject(LanguageService);

  onLanguageChange(language: string): void {
    this.languageService.setLanguage(language);
  }
}
