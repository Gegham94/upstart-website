import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { SelectOptions } from '../../../../interfaces/select-options.interface';

@Component({
  selector: 'us-searchable-input',
  templateUrl: './searchable-input.component.html',
  styleUrls: ['./searchable-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableInputComponent),
      multi: true,
    },
  ],
})
export class SearchableInputComponent implements ControlValueAccessor {
  private _value: string = '';

  public disabled: boolean = false;

  public changeTimer?: ReturnType<typeof setTimeout>;

  public searchBoxOpened: boolean = false;

  public errors?: ValidationErrors;

  @Input()
  public label: string = '';

  @Input()
  public displayOptions: SelectOptions[] = [];

  @Input()
  public placeholder: string = '';

  @Input()
  public requiredPlaceholder: boolean = false;

  @Input()
  public set value(val: string) {
    this._value = val;
  }

  @Output()
  public searchElementChose: EventEmitter<unknown> = new EventEmitter<unknown>();

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

  public valueChange(): void {
    if (this.changeTimer) {
      clearTimeout(this.changeTimer);
    }

    this.changeTimer = setTimeout(() => {
      this.onChange(this.value);
    }, 164);
  }

  public searchElementClicked(value: unknown): void {
    this.searchElementChose.emit(value);
    this.closeSearchBox();
  }

  public openSearchBox(): void {
    this.searchBoxOpened = true;
  }

  public closeSearchBox(): void {
    this.searchBoxOpened = false;
  }

  public get value(): string {
    return this._value;
  }
}
