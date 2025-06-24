import { Injectable } from '@angular/core';
import { DistanceUnit } from '../models/distance-unit.enum';
import { WeightUnit } from '../models/weight-unit.enum';

export interface Config {
  distance: number;
  distanceUnit: DistanceUnit;
  timeHours: number;
  timeMinutes: number;
  timeSeconds: number;
  weight: number;
  weightUnit: WeightUnit;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private STORAGE_KEY = 'running-tools';

  public save(config: Config): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
  }

  public load(): Config | undefined {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Config;
      return {
        distance: parsed.distance,
        distanceUnit: parsed.distanceUnit,
        timeHours: parsed.timeHours,
        timeMinutes: parsed.timeMinutes,
        timeSeconds: parsed.timeSeconds,
        weight: parsed.weight,
        weightUnit: parsed.weightUnit,
      };
    }

    return undefined;
  }
}
