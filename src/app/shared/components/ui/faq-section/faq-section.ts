import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FAQItem,
  StructuredDataService,
} from '../../../../core/services/structured-data.service';

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.html',
  standalone: true,
  imports: [TranslateModule],
})
export class FaqSectionComponent implements OnInit, OnDestroy, AfterViewInit {
  private structuredDataService = inject(StructuredDataService);
  private translateService = inject(TranslateService);

  private faqItems: FAQItem[] = [];
  private pageTitle: string = '';

  ngOnInit(): void {
    // Clean up any existing schema
    this.structuredDataService.removeFAQSchema();
  }

  ngAfterViewInit(): void {
    // Wait a bit for translations to load and DOM to be ready
    setTimeout(() => {
      this.extractFAQData();
    }, 100);
  }

  ngOnDestroy(): void {
    this.structuredDataService.removeFAQSchema();
  }

  private extractFAQData(): void {
    try {
      // Get the FAQ title
      const titleElement = document.querySelector('[faq-title]');
      if (titleElement) {
        this.pageTitle = titleElement.textContent?.trim() || '';
      }

      // Get all FAQ items
      const faqElements = document.querySelectorAll('app-faq-item');
      this.faqItems = [];

      faqElements.forEach(faqElement => {
        const questionElement = faqElement.querySelector('[faq-question]');
        const answerElement = faqElement.querySelector('[faq-answer]');

        if (questionElement && answerElement) {
          const question = questionElement.textContent?.trim() || '';
          const answer = answerElement.innerHTML || '';

          if (question && answer) {
            this.faqItems.push({ question, answer });
          }
        }
      });

      // Add schema markup if we have FAQ items
      if (this.faqItems.length > 0) {
        this.structuredDataService.addFAQSchema(this.faqItems, this.pageTitle);
      }
    } catch (error) {
      console.warn('Error extracting FAQ data for schema markup:', error);
    }
  }
}
