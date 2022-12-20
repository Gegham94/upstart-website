import { ChangeDetectorRef, Component, forwardRef, HostListener, Input } from '@angular/core';
import { ButtonTheme } from '../../../../enums/button-theme.enum';
import { NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'us-confirmable-input',
  templateUrl: './confirmable-input.component.html',
  styleUrls: ['./confirmable-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConfirmableInputComponent),
      multi: true,
    },
  ],
})
export class ConfirmableInputComponent {
  private _value: string = '';

  @Input()
  public label: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public disabled?: boolean;

  @Input()
  public buttonTheme: ButtonTheme = ButtonTheme.primary;

  @Input()
  public buttonText?: string = 'Apply';

  @Input()
  public requiredPlaceholder: boolean = false;

  public unconfirmedValue: string = '';

  public errors?: ValidationErrors;

  @Input()
  public set value(val: string) {
    this._value = val;
  }

  @HostListener('getErrors', ['$event'])
  public getErrors(event: ValidationErrors) {
    this.errors = event;
  }

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

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

  private onTouched() {}

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public valueChange(value: string): void {
    this.unconfirmedValue = value;
  }

  public valueConfirmed(): void {
    this.value = this.unconfirmedValue;
    this.onChange(this.value);
    this.changeDetectorRef.detectChanges();
  }

  public resetConfirmedValue(): void {
    this.unconfirmedValue = this.value;
    this.changeDetectorRef.detectChanges();
  }

  public get value(): string {
    return this._value;
  }
}
