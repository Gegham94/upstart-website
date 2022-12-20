export interface ToggleItem {
  text: string;
  value: number;
  checked?: boolean;
  collapsed?: boolean;
  children?: ToggleItem[];
}
