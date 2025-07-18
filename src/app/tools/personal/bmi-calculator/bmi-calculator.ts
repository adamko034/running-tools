import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CalculatorsFacade } from '../../../core/business/calculators-facade';
import { BmiCategory } from '../../../core/business/model/enums/bmi-category.enum';
import { FatCategory } from '../../../core/business/model/enums/fat-category.enum';
import { IbwCategory } from '../../../core/business/model/enums/ibw-category.enum';
import { WeightUnit } from '../../../core/business/model/enums/weight-unit.enum';
import { Weight } from '../../../core/business/model/weight.model';
import { StoreService } from '../../../core/store/store.service';
import { AgeStoreFormField } from '../../../shared/components/store/age-store-form-field/age-store-form-field';
import { HeightStoreFormField } from '../../../shared/components/store/height-store-form-field/height-store-form-field';
import { SexStoreFormField } from '../../../shared/components/store/sex-store-form-field/sex-store-form-field';
import { WeightStoreFormField } from '../../../shared/components/store/weight-store-form-field/weight-store-form-field';
import { ResultBox } from '../../../shared/components/ui/result-box/result-box';
import { ResultBoxType } from '../../../shared/components/ui/result-box/result-box-type.enum';
import { ToolView } from '../../../shared/views/tool-view/tool-view';

@Component({
  selector: 'app-bmi-calculator',
  imports: [
    TranslateModule,
    ToolView,
    WeightStoreFormField,
    HeightStoreFormField,
    AgeStoreFormField,
    SexStoreFormField,
    ResultBox,
    CommonModule,
  ],
  templateUrl: './bmi-calculator.html',
})
export class BmiCalculator {
  private store = inject(StoreService);
  private facade = inject(CalculatorsFacade);

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
}
