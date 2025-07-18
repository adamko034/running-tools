import { Injectable } from '@angular/core';
import { MathUtils } from '../../utils/math.utils';
import { BmiCategory } from '../model/enums/bmi-category.enum';
import { FatCategory } from '../model/enums/fat-category.enum';
import { HeightUnit } from '../model/enums/height-unit.enum';
import { IbwCategory } from '../model/enums/ibw-category.enum';
import { Sex } from '../model/enums/sex.enum';
import { WeightUnit } from '../model/enums/weight-unit.enum';
import { Height } from '../model/height.model';
import { Weight } from '../model/weight.model';

@Injectable({
  providedIn: 'root',
})
export class BmiService {
  bmi(height: Height, weight: Weight): number {
    if (height.unit === HeightUnit.CM) {
      const heightMeters = height.value / 100; // Convert cm to meters
      return MathUtils.roundTen(
        +(weight.value / (heightMeters * heightMeters))
      );
    }

    return MathUtils.roundTen(
      +((weight.value / (height.value * height.value)) * 703)
    );
  }

  bmiCategory(bmi: number): BmiCategory {
    if (bmi < 18.5) {
      return BmiCategory.UNDERWEIGHT;
    } else if (bmi < 24.9) {
      return BmiCategory.NORMAL;
    } else if (bmi < 29.9) {
      return BmiCategory.OVERWEIGHT;
    } else {
      return BmiCategory.OBESITY;
    }
  }

  bmiHa(height: Height, weight: Weight): number {
    if (height.unit === HeightUnit.CM) {
      const heightMeters = height.value / 100; // Convert cm to meters
      return MathUtils.roundTen(
        (1.3 * weight.value) / Math.pow(heightMeters, 2.5)
      );
    } else {
      return MathUtils.roundTen(
        (5752 * weight.value) / Math.pow(height.value, 2.5)
      );
    }
  }

  fatPercentage(height: Height, weight: Weight, age: number, sex: Sex): number {
    const bmi = this.bmi(height, weight);
    const sexFactor = sex === Sex.M ? 1 : 0;

    // Deurenberg formula
    const bodyFatPercent = 1.2 * bmi + 0.23 * age - 10.8 * sexFactor - 5.4;
    return MathUtils.roundTen(bodyFatPercent);
  }

  fatCategory(fatPercent: number, sex: Sex): FatCategory {
    if (sex === Sex.M) {
      if (fatPercent < 2) return FatCategory.BELOW_ESSENTIAL;
      if (fatPercent <= 5) return FatCategory.ESSENTIAL;
      if (fatPercent <= 13) return FatCategory.ATHLETE;
      if (fatPercent <= 17) return FatCategory.FITNESS;
      if (fatPercent <= 24) return FatCategory.AVERAGE;
      return FatCategory.OBESE;
    } else {
      if (fatPercent < 10) return FatCategory.BELOW_ESSENTIAL;
      if (fatPercent <= 13) return FatCategory.ESSENTIAL;
      if (fatPercent <= 20) return FatCategory.ATHLETE;
      if (fatPercent <= 24) return FatCategory.FITNESS;
      if (fatPercent <= 31) return FatCategory.AVERAGE;
      return FatCategory.OBESE;
    }
  }

  bmr(height: Height, weight: Weight, age: number, sex: Sex): number {
    let bmr = 0;
    if (height.unit === HeightUnit.CM) {
      bmr =
        sex === Sex.M
          ? 10 * weight.value + 6.25 * height.value - 5 * age + 5
          : 10 * weight.value + 6.25 * height.value - 5 * age - 161;
    } else {
      bmr =
        sex === Sex.M
          ? 66 + 6.23 * weight.value + 12.7 * height.value - 6.8 * age
          : 655 + 4.35 * weight.value + 4.7 * height.value - 4.7 * age;
    }
    bmr = MathUtils.roundInteger(bmr);
    return bmr;
  }

  ibw(
    height: Height,
    weight: Weight,
    sex: Sex
  ): { ibw: Weight; category: IbwCategory } {
    const heightCm = height.cloneAndConvert(HeightUnit.CM);
    const extraHeight = Math.max(0, heightCm.value - 152.4);
    const ibw = MathUtils.roundTen(
      (sex === Sex.M ? 50 : 45.5) + 0.9 * extraHeight
    );

    const actualWeightKg = weight.cloneAndConvert(WeightUnit.KG);
    const deviation = Math.abs((actualWeightKg.value - ibw) / ibw);

    let category = IbwCategory.IBW_IDEAL;
    if (deviation > 0.05) category = IbwCategory.IBW_OK;
    if (deviation > 0.15) category = IbwCategory.IBW_IMPROVE;
    if (deviation > 0.25) category = IbwCategory.IBW_BAD;

    const ibwWeight = Weight.of(ibw, WeightUnit.KG);
    ibwWeight.convert(weight.unit);

    return { ibw: ibwWeight, category };
  }
}
