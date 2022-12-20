import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { InputTypeEnum } from '../../../../enums/input-type.enum';

@Component({
  selector: 'us-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  private _value: string = '';

  private isShow = false;

  @Input()
  public type?: string = 'text';

  @Input()
  public min?: number;

  @Input()
  public label?: string = '';

  @Input()
  public disabled?: boolean = false;

  @Input()
  public placeholder?: string = '';

  @Input()
  public requiredPlaceholder?: boolean = false;

  @Input()
  public iconName?: string = '';

  @Input()
  public iconSize?: number = 24;

  public errors?: ValidationErrors;

  @Input()
  public set value(val) {
    this._value = val;
  }

  @Input()
  public toggleIcon?: string = '';

  @Input()
  public activeIcon?: string = '';

  @Input()
  public readonly?: boolean = false;

  @Input()
  public controlName?: FormControl | null;

  @Input()
  public autocomplete?: boolean = true;

  @Input()
  public required?: boolean = false;

  @Output()
  public focusIn: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public focusOut: EventEmitter<Event> = new EventEmitter<Event>();

  @Output()
  public clickIconEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('getErrors', ['$event'])
  public getErrors(event: ValidationErrors) {
    this.errors = event;
  }

  public registerOnChange(fn: () => string): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => string): void {
    this.onTouched = fn;
  }

  public writeValue(obj: string): void {
    this.value = obj;
  }

  private onChange(value: string): string {
    return value;
  }

  public onTouched() {}

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public valueChange(event: Event): void {
    this.value = String((event.target as HTMLInputElement).value);
    this.onChange(this.value);
  }

  public get value() {
    return this._value;
  }

  public clickIcon() {
    this.readonly = false;
  }

  public get getControlName() {
    return this.controlName as FormControl;
  }

  public get hasErrors(): boolean {
    return (
      (!!this.errors && Object.keys(this.errors).length > 0) ||
      (!!this.getControlName?.errors && Object.keys(this.getControlName.errors).length > 0)
    );
  }

  public showInputText() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.type = InputTypeEnum.text;
      this.activeIcon = 'show_eye';
    } else {
      this.type = InputTypeEnum.password;
      this.activeIcon = 'close-eye';
    }
  }
}
