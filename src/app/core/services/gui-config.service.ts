import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { DistanceUnit } from '../models/distance-unit.enum';

export interface GuiConfig {
  distanceUnit: DistanceUnit;
}

const STORAGE_KEY = 'running-tools';

@Injectable({
  providedIn: 'root',
})
export class GuiConfigService {
  private readonly guiConfigSignal = signal<GuiConfig>(this.loadConfig());

  get distanceUnit(): Signal<DistanceUnit> {
    return computed(() => this.guiConfigSignal().distanceUnit);
  }

  constructor() {
    effect(() => this.saveConfig());
  }

  private loadConfig(): GuiConfig {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as GuiConfig;
    }

    return {
      distanceUnit: this.getDefaultUnitFromLocale(),
    };
  }

  private saveConfig(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.guiConfigSignal()));
  }

  private getDefaultUnitFromLocale(): DistanceUnit {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const milesLocales = ['en-US', 'en-GB', 'my', 'lr'];
    return milesLocales.some((code) => locale.startsWith(code))
      ? DistanceUnit.MI
      : DistanceUnit.KM;
  }

  setDistanceUnit(unit: DistanceUnit): void {
    this.guiConfigSignal.set({ ...this.guiConfigSignal(), distanceUnit: unit });
  }
}
