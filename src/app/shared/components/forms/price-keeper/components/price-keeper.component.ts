import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PriceData } from '../../../../interfaces/price-data.interface';
import { SelectOptions } from '../../../../interfaces/select-options.interface';

@Component({
  selector: 'us-price-keeper',
  templateUrl: './price-keeper.component.html',
  styleUrls: ['./price-keeper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceKeeperComponent),
      multi: true,
    },
  ],
})
export class PriceKeeperComponent implements OnInit, ControlValueAccessor {
  private _value?: PriceData;

  public currencyListOpened: boolean = false;

  public selectedCurrency?: SelectOptions<string>;

  public readonly currencyList: SelectOptions<string>[] = [
    {
      displayName: '֏',
      value: 'amd',
    },
  ];

  @Input()
  public label?: string = 'Course Price';

  @Input()
  public disabled?: boolean = false;

  @Input()
  public placeholder?: string = '';

  @Input()
  public requiredPlaceholder: boolean = false;

  @Input()
  public set value(val: PriceData) {
    this._value = val;
  }

  public ngOnInit(): void {
    if (!this._value) {
      this._value = {
        amount: 0,
        currency: this.currencyList[0].value,
      };
    }
  }

  public registerOnChange(fn: () => PriceData): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(obj: PriceData): void {
    this.value = obj;
  }

  private onChange(value: PriceData): PriceData {
    return value;
  }

  private onTouched() {}

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public amountChange(event: Event): void {
    this.value.amount = Number((event.target as HTMLInputElement).value);
    this.onChange(this.value);
  }

  public currencyChange(newCurrency: SelectOptions<string>): void {
    this.value.currency = newCurrency.value;
    this.onChange(this.value);
    this.currencyListOpened = false;
    this.selectedCurrency = newCurrency;
  }

  public get value(): PriceData {
    return this._value as PriceData;
  }
}
