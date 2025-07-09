import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-language-store-selector',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './language-store-selector.html',
})
export class LanguageStoreSelector {
  @Input() floatingIcon = false;

  private languageService = inject(LanguageService);

  onLanguageChange(language: string): void {
    this.languageService.setLanguage(language);
  }
}
