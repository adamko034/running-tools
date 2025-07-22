import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateBmiCalculatorMeta() {
    this.title.setTitle('BMI Calculator for Runners - Body Composition Analysis | Runner Toolkit');
    this.updateMeta({
      description: 'Free BMI calculator for runners with BMR, body fat percentage, and ideal body weight. Calculate BMI, New BMI, IBW, and metabolic rate for optimal running performance.',
      keywords: 'BMI calculator runners, BMR calculator, body fat percentage, ideal body weight calculator, new BMI calculator, running body composition',
      'og:title': 'BMI Calculator for Runners - Body Composition Analysis | Runner Toolkit',
      'og:description': 'Free BMI calculator for runners with BMR, body fat percentage, and ideal body weight. Calculate BMI, New BMI, IBW, and metabolic rate for optimal running performance.',
      'twitter:title': 'BMI Calculator for Runners - Body Composition Analysis | Runner Toolkit',
      'twitter:description': 'Free BMI calculator for runners with BMR, body fat percentage, and ideal body weight. Calculate BMI, New BMI, IBW, and metabolic rate for optimal running performance.'
    });
  }

  updatePaceCalculatorMeta() {
    this.title.setTitle('Running Pace Calculator - Calculate Pace, Speed & Time | Runner Toolkit');
    this.updateMeta({
      description: 'Free running pace calculator for marathons, 5K, 10K races. Calculate pace, speed, distance and time. Perfect for training and race planning.',
      keywords: 'running pace calculator, marathon pace calculator, 5K pace calculator, running speed calculator, race pace calculator',
      'og:title': 'Running Pace Calculator - Calculate Pace, Speed & Time | Runner Toolkit',
      'og:description': 'Free running pace calculator for marathons, 5K, 10K races. Calculate pace, speed, distance and time. Perfect for training and race planning.',
      'twitter:title': 'Running Pace Calculator - Calculate Pace, Speed & Time | Runner Toolkit',
      'twitter:description': 'Free running pace calculator for marathons, 5K, 10K races. Calculate pace, speed, distance and time. Perfect for training and race planning.'
    });
  }

  updateVo2MaxCalculatorMeta() {
    this.title.setTitle('VO2 Max Calculator for Runners - Aerobic Fitness Test | Runner Toolkit');
    this.updateMeta({
      description: 'Calculate your VO2 max based on running performance. Free aerobic fitness calculator for runners to measure cardiovascular endurance and training zones.',
      keywords: 'VO2 max calculator, aerobic fitness calculator, running fitness test, cardiovascular endurance, training zones calculator',
      'og:title': 'VO2 Max Calculator for Runners - Aerobic Fitness Test | Runner Toolkit',
      'og:description': 'Calculate your VO2 max based on running performance. Free aerobic fitness calculator for runners to measure cardiovascular endurance and training zones.',
      'twitter:title': 'VO2 Max Calculator for Runners - Aerobic Fitness Test | Runner Toolkit',
      'twitter:description': 'Calculate your VO2 max based on running performance. Free aerobic fitness calculator for runners to measure cardiovascular endurance and training zones.'
    });
  }

  updateCaloriesBurnedMeta() {
    this.title.setTitle('Calories Burned Running Calculator - Track Your Workout | Runner Toolkit');
    this.updateMeta({
      description: 'Calculate calories burned while running based on distance, time, and body weight. Free running calorie calculator for accurate workout tracking.',
      keywords: 'calories burned running calculator, running calorie calculator, workout calorie counter, running energy expenditure',
      'og:title': 'Calories Burned Running Calculator - Track Your Workout | Runner Toolkit',
      'og:description': 'Calculate calories burned while running based on distance, time, and body weight. Free running calorie calculator for accurate workout tracking.',
      'twitter:title': 'Calories Burned Running Calculator - Track Your Workout | Runner Toolkit',
      'twitter:description': 'Calculate calories burned while running based on distance, time, and body weight. Free running calorie calculator for accurate workout tracking.'
    });
  }

  updateFinishTimePredictorMeta() {
    this.title.setTitle('Marathon Time Predictor - Race Finish Time Calculator | Runner Toolkit');
    this.updateMeta({
      description: 'Predict your marathon, half marathon, 5K and 10K finish times based on current performance. Free race time predictor for runners.',
      keywords: 'marathon time predictor, race time calculator, finish time predictor, marathon calculator, half marathon time predictor',
      'og:title': 'Marathon Time Predictor - Race Finish Time Calculator | Runner Toolkit',
      'og:description': 'Predict your marathon, half marathon, 5K and 10K finish times based on current performance. Free race time predictor for runners.',
      'twitter:title': 'Marathon Time Predictor - Race Finish Time Calculator | Runner Toolkit',
      'twitter:description': 'Predict your marathon, half marathon, 5K and 10K finish times based on current performance. Free race time predictor for runners.'
    });
  }

  updateDistanceConverterMeta() {
    this.title.setTitle('Distance Unit Converter - Kilometers to Miles for Runners | Runner Toolkit');
    this.updateMeta({
      description: 'Free distance unit converter for runners. Convert kilometers to miles and miles to kilometers instantly. Perfect for race planning and training conversions.',
      keywords: 'distance converter, kilometers to miles, miles to kilometers, running distance converter, race distance converter, km to miles calculator',
      'og:title': 'Distance Unit Converter - Kilometers to Miles for Runners | Runner Toolkit',
      'og:description': 'Free distance unit converter for runners. Convert kilometers to miles and miles to kilometers instantly. Perfect for race planning and training conversions.',
      'twitter:title': 'Distance Unit Converter - Kilometers to Miles for Runners | Runner Toolkit',
      'twitter:description': 'Free distance unit converter for runners. Convert kilometers to miles and miles to kilometers instantly. Perfect for race planning and training conversions.'
    });
  }

  updatePaceToSpeedMeta() {
    this.title.setTitle('Pace to Speed Converter - Running Pace & Speed Calculator | Runner Toolkit');
    this.updateMeta({
      description: 'Convert between running pace and speed instantly. Free pace to speed converter for runners with min/km, min/mile, km/h, and mph calculations.',
      keywords: 'pace to speed converter, running pace calculator, speed calculator, min/km to km/h, min/mile to mph, pace speed conversion',
      'og:title': 'Pace to Speed Converter - Running Pace & Speed Calculator | Runner Toolkit',
      'og:description': 'Convert between running pace and speed instantly. Free pace to speed converter for runners with min/km, min/mile, km/h, and mph calculations.',
      'twitter:title': 'Pace to Speed Converter - Running Pace & Speed Calculator | Runner Toolkit',
      'twitter:description': 'Convert between running pace and speed instantly. Free pace to speed converter for runners with min/km, min/mile, km/h, and mph calculations.'
    });
  }

  updateWeightConverterMeta() {
    this.title.setTitle('Weight Unit Converter - Kilograms to Pounds for Runners | Runner Toolkit');
    this.updateMeta({
      description: 'Free weight unit converter for runners. Convert kilograms to pounds and pounds to kilograms instantly. Perfect for training and nutrition planning.',
      keywords: 'weight converter, kilograms to pounds, pounds to kilograms, kg to lbs calculator, weight unit conversion, running weight converter',
      'og:title': 'Weight Unit Converter - Kilograms to Pounds for Runners | Runner Toolkit',
      'og:description': 'Free weight unit converter for runners. Convert kilograms to pounds and pounds to kilograms instantly. Perfect for training and nutrition planning.',
      'twitter:title': 'Weight Unit Converter - Kilograms to Pounds for Runners | Runner Toolkit',
      'twitter:description': 'Free weight unit converter for runners. Convert kilograms to pounds and pounds to kilograms instantly. Perfect for training and nutrition planning.'
    });
  }

  updateTrainingPacesCalculatorMeta() {
    this.title.setTitle('Training Paces Calculator - Personalized Running Zones | Runner Toolkit');
    this.updateMeta({
      description: 'Calculate personalized training paces based on your recent runs. Get recovery, base, conversational, and tempo paces for optimal training zones.',
      keywords: 'training paces calculator, running zones calculator, recovery pace, base pace, conversational pace, tempo pace, training heart rate zones',
      'og:title': 'Training Paces Calculator - Personalized Running Zones | Runner Toolkit',
      'og:description': 'Calculate personalized training paces based on your recent runs. Get recovery, base, conversational, and tempo paces for optimal training zones.',
      'twitter:title': 'Training Paces Calculator - Personalized Running Zones | Runner Toolkit',
      'twitter:description': 'Calculate personalized training paces based on your recent runs. Get recovery, base, conversational, and tempo paces for optimal training zones.'
    });
  }

  private updateMeta(tags: { [key: string]: string }) {
    Object.keys(tags).forEach(key => {
      if (key.startsWith('og:') || key.startsWith('twitter:')) {
        this.meta.updateTag({ property: key, content: tags[key] });
      } else {
        this.meta.updateTag({ name: key, content: tags[key] });
      }
    });
  }
}