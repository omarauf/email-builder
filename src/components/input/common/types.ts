export interface Option<T = number, U = string> {
  id: T;
  name: U;
  systemColor?: string;
  color?: string;
  icon?: string;
}
