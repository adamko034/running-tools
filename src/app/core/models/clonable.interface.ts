export interface Cloneable<T> {
  clone(overrides?: Partial<T>): T;
}
