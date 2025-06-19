import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DistanceUnit } from '../models/distance-unit.enum';
import { Pace } from '../models/pace.model';
import { Time } from '../models/time.model';
import { LocalStorageService } from './../services/local-storage.service';
import { Store } from './store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _store: WritableSignal<Store>;

  private localStorageService = inject(LocalStorageService);

  get store(): Signal<Store> {
    return computed(() => this._store());
  }

  get distanceUnit(): Signal<DistanceUnit> {
    return computed(() => this._store().distanceUnit);
  }

  get distance(): Signal<number> {
    return computed(() => this._store().distance);
  }

  get time(): Signal<Time> {
    return computed(() => this._store().time);
  }

  get pace(): Signal<Pace> {
    return computed(() => this._store().pace);
  }

  constructor() {
    this._store = signal<Store>(this.loadStore());
    effect(() => {
      this.calculatePace();
      this.saveStore();
    });
  }

  public updateDistanceUnit(newUnit: DistanceUnit) {
    this._store.set({ ...this._store(), distanceUnit: newUnit });
  }

  public updateDistance(distance: number) {
    this._store.set({ ...this._store(), distance });
  }

  public updateTime(time: Time) {
    this._store.set({ ...this._store(), time });
  }

  public updatePace(newPace: Pace) {
    const time = newPace.calculateTime(this._store().distance);
    this._store.update((current) => ({ ...current, time }));
  }

  private calculatePace() {
    const { time, distance, pace: currentPace } = this._store();
    const newPace = Pace.calculate(time, distance);

    console.log(time, distance, currentPace, newPace);

    if (currentPace.totalSeconds() != newPace.totalSeconds()) {
      this._store.update((current) => ({ ...current, pace: newPace }));
    }
  }

  private saveStore() {
    const { distance, distanceUnit, time } = this._store();
    this.localStorageService.save({
      distance,
      distanceUnit,
      timeHours: time.hours,
      timeMinutes: time.minutes,
      timeSeconds: time.seconds,
    });
  }

  private loadStore(): Store {
    const stored = this.localStorageService.load();
    const initialStore = this.initialValues();

    if (!stored) {
      return initialStore;
    }

    const time = Time.of(
      stored.timeHours || 0,
      stored.timeMinutes || 55,
      stored.timeSeconds || 0,
    );
    return { ...initialStore, ...stored, time };
  }

  private initialValues(): Store {
    const time = Time.default();
    const distance = 10;
    const distanceUnit = this.getDistanceUnitFromLocal();
    const pace = Pace.calculate(time, distance);

    return {
      distance,
      distanceUnit,
      time,
      pace,
    };
  }

  private getDistanceUnitFromLocal(): DistanceUnit {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const milesLocales = ['en-US', 'en-GB', 'my', 'lr'];
    return milesLocales.some((code) => locale.startsWith(code))
      ? DistanceUnit.MI
      : DistanceUnit.KM;
  }
}
