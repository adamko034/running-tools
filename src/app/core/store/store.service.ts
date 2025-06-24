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
import { Distance } from '../models/distance.model';
import { Pace } from '../models/pace.model';
import { Time } from '../models/time.model';
import { WeightUnit } from '../models/weight-unit.enum';
import { Weight } from '../models/weight.model';
import { LocalStorageService } from './../services/local-storage.service';
import { Store } from './store.model';
import { Units } from './units.model';

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
    return computed(() => this._store().units.distance);
  }

  get distance(): Signal<Distance> {
    return computed(() => this._store().distance);
  }

  get time(): Signal<Time> {
    return computed(() => this._store().time);
  }

  get pace(): Signal<Pace> {
    return computed(() => this._store().pace);
  }

  get weight(): Signal<Weight> {
    return computed(() => this._store().weight);
  }

  get weightUnit(): Signal<WeightUnit> {
    return computed(() => this._store().units.weight);
  }

  constructor() {
    this._store = signal<Store>(this.loadStore());
    effect(() => {
      console.log('store change');
      this.calculatePace();
      this.saveStore();
    });
  }

  public updateUnits(units: Units) {
    const distance = this._store().distance;
    distance.unit = units.distance;

    const weight = this._store().weight;
    weight.unit = units.weight;

    this._store.set({ ...this._store(), distance, units, weight });
  }

  public updateDistance(distance: Distance) {
    this._store.set({ ...this._store(), distance });
  }

  public updateTime(time: Time) {
    this._store.set({ ...this._store(), time });
  }

  public updatePace(newPace: Pace) {
    const time = newPace.calculateTime(this._store().distance);
    this._store.update((current) => ({ ...current, time }));
  }

  public updateWeight(weight: Weight) {
    this._store.update((current) => ({ ...current, weight }));
  }

  public updateWeightUnit(newUnit: WeightUnit) {
    const weight = this._store().weight;
    weight.unit = newUnit;

    this._store.update((current) => ({
      ...current,
      weight,
      weightUnit: newUnit,
    }));
  }

  private calculatePace() {
    const { time, distance, pace: currentPace } = this._store();
    const newPace = Pace.calculate(time, distance.value);

    if (currentPace.totalSeconds() != newPace.totalSeconds()) {
      this._store.update((current) => ({ ...current, pace: newPace }));
    }
  }

  private saveStore() {
    const { distance, units, time, weight } = this._store();
    this.localStorageService.save({
      distance: distance.value,
      distanceUnit: units.distance,
      timeHours: time.hours,
      timeMinutes: time.minutes,
      timeSeconds: time.seconds,
      weight: weight.value,
      weightUnit: units.weight,
    });
  }

  private loadStore(): Store {
    const stored = this.localStorageService.load();
    const initialStore = this.initialValues();

    if (!stored) {
      return initialStore;
    }

    const distance = Distance.ofValueUnit(
      stored.distance || initialStore.distance.value,
      stored.distanceUnit || initialStore.units.distance,
    );

    const time = Time.of(
      stored.timeHours || initialStore.time.hours,
      stored.timeMinutes || initialStore.time.minutes,
      stored.timeSeconds || initialStore.time.seconds,
    );

    const weight = Weight.of(
      stored.weight || initialStore.weight.value,
      stored.weightUnit || initialStore.units.weight,
    );

    const units = {
      distance: stored.distanceUnit || initialStore.units.distance,
      weight: stored.weightUnit || initialStore.units.weight,
    };

    return { ...initialStore, ...stored, time, distance, weight, units };
  }

  private initialValues(): Store {
    const time = Time.of(0, 55, 0);
    const distanceUnit = this.getDistanceUnitFromLocal();
    const distance = Distance.ofValueUnit(10, distanceUnit);
    const pace = Pace.calculate(time, distance.value);
    const weightUnit =
      distanceUnit == DistanceUnit.KM ? WeightUnit.KG : WeightUnit.LB;
    const weight = Weight.of(80, weightUnit);

    return {
      distance,
      time,
      pace,
      weight,
      units: { distance: distanceUnit, weight: weightUnit },
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
