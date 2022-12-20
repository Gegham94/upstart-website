import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'us-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent), // replace name as appropriate
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  private _value: boolean = false;

  @Input()
  public label?: string = '';

  @Input()
  public disabled?: boolean = false;

  @Input()
  public placeholder?: string = '';

  @Input()
  public set value(val) {
    this._value = val;
  }

  @Output()
  public checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  public registerOnChange(fn: () => boolean): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => boolean): void {
    this.onTouched = fn;
  }

  public writeValue(obj: boolean): void {
    this.value = obj;
  }

  private onChange(value: boolean): boolean {
    return value;
  }

  private onTouched() {}

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public valueChange(event: Event): void {
    this.value = (event.target as HTMLInputElement).checked;
    this.checked.emit(this.value);
    this.onChange(this.value);
  }

  public get value() {
    return this._value;
  }
}
