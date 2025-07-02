export interface BusinessModel<T, U> {
  clone(overrides?: Partial<T>): T;
  cloneAndConvert(unit: U): T;
  convert(unit: U): void;
  format(): string;
  isTheSameAs(other: T): boolean;
  validate(): void;
}
