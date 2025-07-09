import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Distance } from '../business/model/distance.model';
import { DistanceUnit } from '../business/model/enums/distance-unit.enum';
import { WeightUnit } from '../business/model/enums/weight-unit.enum';
import { Pace } from '../business/model/pace.model';
import { Time } from '../business/model/time.model';
import { Weight } from '../business/model/weight.model';
import { LocalStorageService } from './../services/local-storage.service';
import { Store } from './store.model';
import { Units } from './units.enum';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly _store: WritableSignal<Store>;

  private localStorageService = inject(LocalStorageService);

  get store(): Signal<Store> {
    return computed(() => this._store());
  }

  get distance(): Signal<Distance> {
    return computed(() => this._store().distance);
  }

  get time(): Signal<Time> {
    return computed(() => this._store().time);
  }

  get pace(): Signal<Pace> {
    return computed(() => this._store().pace.clone());
  }

  get weight(): Signal<Weight> {
    return computed(() => this._store().weight);
  }

  get units(): Signal<Units> {
    return computed(() => this._store().units);
  }

  get lang(): Signal<string> {
    return computed(() => this._store().lang);
  }

  constructor() {
    this._store = signal<Store>(this.loadStore());
    effect(() => {
      console.log('store change');
      this.calculatePace();
      this.saveStore();

      console.log(this._store());
    });
  }

  public updateUnits(newUnits: Units) {
    const distance = this._store().distance;
    distance.unit = this.getDistanceUnit(newUnits);

    const weight = this._store().weight;
    weight.unit = this.getWeightUnit(newUnits);

    this._store.set({
      ...this._store(),
      distance: distance.clone(),
      units: newUnits,
      weight: weight.clone(),
    });
  }

  public updateDistance(distance: Distance) {
    this._store.update(current => ({
      ...current,
      distance: distance.clone(),
    }));
  }

  public updateTime(time: Time) {
    this._store.set({ ...this._store(), time: time.clone() });
  }

  public updatePace(newPace: Pace) {
    console.log('store, updating pace current: ', this._store().pace.format());
    const time = newPace.toTime(this._store().distance);
    this._store.update(current => ({ ...current, time }));
  }

  public updateWeight(weight: Weight) {
    this._store.update(current => ({ ...current, weight: weight.clone() }));
  }

  public updateLanguage(lang: string) {
    this._store.update(current => ({ ...current, lang }));
  }

  private calculatePace() {
    console.log(
      'store, calculating new pace current: ',
      this._store().pace.format()
    );
    const { time, distance, pace: currentPace } = this._store();
    const newPace = Pace.calculate(time, distance);

    if (!currentPace.isTheSameAs(newPace)) {
      console.log('store, new pace');
      this._store.update(current => ({ ...current, pace: newPace }));
    }
  }

  private saveStore() {
    const { distance, units, time, weight, lang } = this._store();
    this.localStorageService.save({
      distance: distance.value,
      units,
      timeHours: time.hours,
      timeMinutes: time.minutes,
      timeSeconds: time.seconds,
      weight: weight.value,
      lang,
    });
  }

  private loadStore(): Store {
    const stored = this.localStorageService.load();
    const initialStore = this.initialValues();

    if (!stored) {
      return initialStore;
    }

    const units = stored.units || initialStore.units;
    const distance = Distance.of(
      stored.distance || initialStore.distance.value,
      this.getDistanceUnit(units)
    );

    const time = Time.of(
      stored.timeHours || initialStore.time.hours,
      stored.timeMinutes || initialStore.time.minutes,
      stored.timeSeconds || initialStore.time.seconds
    );

    const weight = Weight.of(
      stored.weight || initialStore.weight.value,
      this.getWeightUnit(units)
    );
    const lang = stored.lang || initialStore.lang;

    return { ...initialStore, time, distance, weight, units, lang };
  }

  private initialValues(): Store {
    const time = Time.of(0, 55, 0);
    const distanceUnit = this.getDistanceUnitFromLocal();
    const distance = Distance.of(10, distanceUnit);
    const pace = Pace.calculate(time, distance);
    const weightUnit =
      distanceUnit == DistanceUnit.KM ? WeightUnit.KG : WeightUnit.LB;
    const weight = Weight.of(80, weightUnit);

    return {
      distance,
      time,
      pace,
      weight,
      units: distanceUnit === DistanceUnit.KM ? Units.EU : Units.EN,
      lang: this.getLanguageFromLocal(),
    };
  }

  public getLanguageFromLocal(): string {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const supportedLanguages = ['en', 'de', 'fr', 'es', 'pl', 'it'];
    const languageCode = locale.split('-')[0];

    return supportedLanguages.includes(languageCode) ? languageCode : 'en';
  }

  private getDistanceUnitFromLocal(): DistanceUnit {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const milesLocales = ['en-US', 'en-GB', 'my', 'lr'];
    return milesLocales.some(code => locale.startsWith(code))
      ? DistanceUnit.MI
      : DistanceUnit.KM;
  }

  private getDistanceUnit(units: Units): DistanceUnit {
    return units === Units.EU ? DistanceUnit.KM : DistanceUnit.MI;
  }

  private getWeightUnit(units: Units): WeightUnit {
    return units === Units.EU ? WeightUnit.KG : WeightUnit.LB;
  }
}
