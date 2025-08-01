import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CalculatorsFacade } from '../../../../core/business/calculators-facade';
import { BmiCategory } from '../../../../core/business/model/enums/bmi-category.enum';
import { FatCategory } from '../../../../core/business/model/enums/fat-category.enum';
import { IbwCategory } from '../../../../core/business/model/enums/ibw-category.enum';
import { WeightUnit } from '../../../../core/business/model/enums/weight-unit.enum';
import { Weight } from '../../../../core/business/model/weight.model';
import { SeoService } from '../../../../core/services/seo.service';
import { StoreService } from '../../../../core/store/store.service';
import { AgeStoreFormField } from '../../../../shared/components/store/age-store-form-field/age-store-form-field';
import { HeightStoreFormField } from '../../../../shared/components/store/height-store-form-field/height-store-form-field';
import { SexStoreFormField } from '../../../../shared/components/store/sex-store-form-field/sex-store-form-field';
import { WeightStoreFormField } from '../../../../shared/components/store/weight-store-form-field/weight-store-form-field';
import { FancyResult } from '../../../../shared/components/ui/fancy-result/fancy-result';
import { ResultBoxType } from '../../../../shared/components/ui/fancy-result/result-box-type.enum';
import { FaqItemComponent } from '../../../../shared/components/ui/faq-item/faq-item';
import { FaqSectionComponent } from '../../../../shared/components/ui/faq-section/faq-section';
import { ToolView } from '../../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-bmi-calculator',
  imports: [
    TranslateModule,
    ToolView,
    WeightStoreFormField,
    HeightStoreFormField,
    AgeStoreFormField,
    SexStoreFormField,
    FancyResult,
    FaqSectionComponent,
    FaqItemComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './bmi-calculator.html',
})
export class BmiCalculator {
  private store = inject(StoreService);
  private facade = inject(CalculatorsFacade);
  private seoService = inject(SeoService);

  public bmi = 0;
  public bmiCategory = BmiCategory.NORMAL;
  public bmiHa = 0;
  public bmiHaCategory = BmiCategory.NORMAL;
  public fat = 15;
  public fatCategory = FatCategory.AVERAGE;
  public bmr = { bmr: 0, category: 'BMR_OK' };
  public ibw = {
    ibw: Weight.of(0, WeightUnit.KG),
    category: IbwCategory.IBW_OK,
  };

  constructor() {
    // Set SEO meta tags for BMI calculator
    this.seoService.updateBmiCalculatorMeta();

    effect(() => {
      const height = this.store.height();
      const weight = this.store.weight();
      const age = this.store.age();
      const sex = this.store.sex();

      this.bmi = this.facade.bmi(height, weight);
      this.bmiCategory = this.facade.bmiCategory(this.bmi);
      this.bmiHa = this.facade.bmiHa(height, weight);
      this.bmiHaCategory = this.facade.bmiCategory(this.bmiHa);
      this.fat = this.facade.fatPercentage(height, weight, age, sex);
      this.fatCategory = this.facade.fatCategory(this.fat, sex);
      this.bmr.bmr = this.facade.bmr(height, weight, age, sex);
      this.ibw = this.facade.ibw(height, weight, sex);
    });
  }

  categoryToResultBoxType(category: string): ResultBoxType {
    switch (category.toUpperCase()) {
      case 'ATHLETES':
      case 'FITNESS':
      case 'IBW_IDEAL':
        return ResultBoxType.EXCELLENT;

      case 'NORMAL':
      case 'AVERAGE':
      case 'IBW_OK':
        return ResultBoxType.OK;

      case 'BMR_OK':
        return ResultBoxType.INFO;

      case 'UNDERWEIGHT':
      case 'ESSENTIAL':
      case 'OVERWEIGHT':
      case 'IBW_IMPROVE':
        return ResultBoxType.COULD_IMPROVE;

      case 'OBESE':
      case 'BELOW_ESSENTIAL':
      case 'IBW_BAD':
        return ResultBoxType.BAD;

      default:
        return ResultBoxType.COULD_IMPROVE;
    }
  }

  getCategoryBadgeClass(category: string): string {
    switch (this.categoryToResultBoxType(category)) {
      case ResultBoxType.EXCELLENT:
        return 'bg-green-200 text-green-900';
      case ResultBoxType.OK:
        return 'bg-green-50 text-green-700';
      case ResultBoxType.INFO:
        return 'bg-blue-200 text-blue-800';
      case ResultBoxType.COULD_IMPROVE:
        return 'bg-amber-100 text-amber-800';
      case ResultBoxType.BAD:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getValueClass(category: string): string {
    switch (this.categoryToResultBoxType(category)) {
      case ResultBoxType.EXCELLENT:
        return 'text-green-800';
      case ResultBoxType.OK:
        return 'text-green-600';
      case ResultBoxType.INFO:
        return 'text-blue-700';
      case ResultBoxType.COULD_IMPROVE:
        return 'text-amber-700';
      case ResultBoxType.BAD:
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  }

  getIcon(category: string): string {
    switch (this.categoryToResultBoxType(category)) {
      case ResultBoxType.EXCELLENT:
        return 'emoji_events';
      case ResultBoxType.OK:
        return 'check_circle';
      case ResultBoxType.INFO:
        return 'info';
      case ResultBoxType.COULD_IMPROVE:
        return 'warning';
      case ResultBoxType.BAD:
        return 'error_outline';
      default:
        return 'info';
    }
  }

  getIconBackgroundClass(category: string): string {
    switch (this.categoryToResultBoxType(category)) {
      case ResultBoxType.EXCELLENT:
        return 'bg-green-200';
      case ResultBoxType.OK:
        return 'bg-green-50';
      case ResultBoxType.INFO:
        return 'bg-blue-200';
      case ResultBoxType.COULD_IMPROVE:
        return 'bg-amber-100';
      case ResultBoxType.BAD:
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  }

  getIconColorClass(category: string): string {
    switch (this.categoryToResultBoxType(category)) {
      case ResultBoxType.EXCELLENT:
        return 'text-green-700';
      case ResultBoxType.OK:
        return 'text-green-500';
      case ResultBoxType.INFO:
        return 'text-blue-700';
      case ResultBoxType.COULD_IMPROVE:
        return 'text-amber-600';
      case ResultBoxType.BAD:
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  }

  getColorScheme(
    category: string
  ): 'blue-green' | 'emerald' | 'amber' | 'red' | 'green' {
    switch (this.categoryToResultBoxType(category)) {
      case ResultBoxType.EXCELLENT:
        return 'green';
      case ResultBoxType.OK:
        return 'emerald';
      case ResultBoxType.INFO:
        return 'blue-green';
      case ResultBoxType.COULD_IMPROVE:
        return 'amber';
      case ResultBoxType.BAD:
        return 'red';
      default:
        return 'blue-green';
    }
  }

  getMetricLabel(type: string): string {
    switch (type) {
      case 'BMI':
        return 'BMI';
      case 'BMI_HA':
        return 'New BMI';
      case 'IBW':
        return 'Ideal Weight';
      case 'FAT':
        return 'Body Fat %';
      case 'BMR':
        return 'BMR (Calories/Day)';
      default:
        return '';
    }
  }

  getCategoryLabel(type: string, category: string): string {
    switch (type) {
      case 'BMI':
        switch (category) {
          case BmiCategory.UNDERWEIGHT:
            return 'Underweight';
          case BmiCategory.NORMAL:
            return 'Normal';
          case BmiCategory.OVERWEIGHT:
            return 'Overweight';
          case BmiCategory.OBESITY:
            return 'Obese';
          default:
            return '';
        }
      case 'BMI_HA':
        switch (category) {
          case BmiCategory.UNDERWEIGHT:
            return 'Underweight';
          case BmiCategory.NORMAL:
            return 'Healthy weight';
          case BmiCategory.OVERWEIGHT:
            return 'Slightly overweight';
          case BmiCategory.OBESITY:
            return 'Obese';
          default:
            return '';
        }
      case 'IBW':
        switch (category) {
          case IbwCategory.IBW_IDEAL:
            return 'Your weight is ideal';
          case IbwCategory.IBW_OK:
            return 'Your weight is acceptable';
          case IbwCategory.IBW_IMPROVE:
            return 'Your weight could be improved';
          case IbwCategory.IBW_BAD:
            return 'Your weight is far from ideal';
          default:
            return '';
        }
      case 'FAT':
        switch (category) {
          case FatCategory.BELOW_ESSENTIAL:
            return 'Dangerously low';
          case FatCategory.ESSENTIAL:
            return 'Mminimum healthy level';
          case FatCategory.ATHLETE:
            return 'Athletic body';
          case FatCategory.FITNESS:
            return 'Fit body';
          case FatCategory.AVERAGE:
            return 'Average';
          case FatCategory.OBESE:
            return 'Obese';
          default:
            return '';
        }
      case 'BMR':
        return 'Calories burned at rest';
      default:
        return '';
    }
  }
}
