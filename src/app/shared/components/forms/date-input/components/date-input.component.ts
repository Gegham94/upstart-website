import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { CalendarValue } from 'ng2-date-picker/lib/common/types/calendar-value';
import { Dayjs } from 'dayjs';
import * as dayjs from 'dayjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'us-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  private _value: Date = new Date();

  private disabled: boolean = false;

  public errors?: ValidationErrors;

  @Input()
  public mode: 'day' | 'month' | 'time' | 'daytime' = 'day';

  @Input()
  public label?: string;

  @Input()
  public minDate?: Dayjs = dayjs(new Date());

  @Input()
  public set value(val) {
    this._value = val;
  }

  @Input()
  public readonly?: boolean = false;

  @Input()
  public requiredPlaceholder: boolean = false;

  @Output()
  public clickIconEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('getErrors', ['$event'])
  public getErrors(event: ValidationErrors) {
    this.errors = event;
  }

  public registerOnChange(fn: () => Date): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => Date): void {
    this.onTouched = fn;
  }

  public writeValue(obj: Date): void {
    this.value = obj;
  }

  private onChange(value: Date): Date {
    return value;
  }

  public onTouched() {}

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public valueChange(event: Date): void {
    this.value = event;
    this.onChange(this.value);
  }

  public get value() {
    if (typeof this._value === 'string') {
      this._value = dayjs(this._value, 'DD-MM-YYYY').toDate();
    }
    return this._value;
  }

  public calendarDaySelected(event: CalendarValue) {
    if (event) {
      this.value = dayjs(event as Dayjs).toDate();
    }
  }
}
