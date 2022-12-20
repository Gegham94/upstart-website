export interface SelectOptions<T = unknown> {
  displayName: string;
  value: T;
  children?: SelectOptions[];
}
