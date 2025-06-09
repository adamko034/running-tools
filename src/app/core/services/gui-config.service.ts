import { computed, effect, Injectable, Signal, signal } from '@angular/core';

export interface GuiConfig {
  distanceUnit: 'km' | 'mi';
}

const STORAGE_KEY = 'running-tools';

@Injectable({
  providedIn: 'root',
})
export class GuiConfigService {
  private readonly guiConfigSignal = signal<GuiConfig>(this.loadConfig());

  get distanceUnit(): Signal<'km' | 'mi'> {
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

  private getDefaultUnitFromLocale(): 'km' | 'mi' {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const milesLocales = ['en-US', 'en-GB', 'my', 'lr'];
    return milesLocales.some((code) => locale.startsWith(code)) ? 'mi' : 'km';
  }

  setDistanceUnit(unit: 'km' | 'mi'): void {
    this.guiConfigSignal.set({ ...this.guiConfigSignal(), distanceUnit: unit });
  }
}
