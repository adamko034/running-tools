import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface FAQItem {
  question: string;
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Add FAQ schema markup to the page for better SEO and featured snippets
   */
  addFAQSchema(faqItems: FAQItem[], pageTitle?: string): void {
    // Remove any existing FAQ schema
    this.removeFAQSchema();

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": pageTitle,
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": this.stripHtmlTags(item.answer)
        }
      }))
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify(faqSchema);
    this.document.head.appendChild(script);
  }

  /**
   * Remove FAQ schema markup from the page
   */
  removeFAQSchema(): void {
    const existingSchema = this.document.getElementById('faq-schema');
    if (existingSchema) {
      existingSchema.remove();
    }
  }

  /**
   * Add Calculator schema markup for tools
   */
  addCalculatorSchema(calculatorName: string, description: string, url: string): void {
    // Remove any existing calculator schema
    this.removeCalculatorSchema();

    const calculatorSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": calculatorName,
      "description": description,
      "url": url,
      "applicationCategory": "CalculatorApplication",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "Runner Toolkit"
      }
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'calculator-schema';
    script.textContent = JSON.stringify(calculatorSchema);
    this.document.head.appendChild(script);
  }

  /**
   * Remove Calculator schema markup from the page
   */
  removeCalculatorSchema(): void {
    const existingSchema = this.document.getElementById('calculator-schema');
    if (existingSchema) {
      existingSchema.remove();
    }
  }

  /**
   * Strip HTML tags from text for schema markup
   */
  private stripHtmlTags(html: string): string {
    const div = this.document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  /**
   * Clean up all schema markup when component is destroyed
   */
  cleanup(): void {
    this.removeFAQSchema();
    this.removeCalculatorSchema();
  }
}