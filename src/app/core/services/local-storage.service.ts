import { Injectable } from '@angular/core';
import { Units } from '../store/units.enum';

export interface Config {
  distance: number;
  units: Units;
  timeHours: number;
  timeMinutes: number;
  timeSeconds: number;
  weight: number;
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
        units: parsed.units,
        timeHours: parsed.timeHours,
        timeMinutes: parsed.timeMinutes,
        timeSeconds: parsed.timeSeconds,
        weight: parsed.weight,
      };
    }

    return undefined;
  }
}
