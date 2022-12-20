import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { SelectOptions } from '../../../interfaces/select-options.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { DeepSearchHelper } from '../../../helpers/deep-search.helper';

@Component({
  selector: 'us-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnChanges, ControlValueAccessor {
  private _value?: unknown | unknown[];

  public displayOptions: SelectOptions[] = [];

  public optionsListOpened: boolean = false;

  public displayValue: string = '';

  public multipleDisplayValue: string[] = [];

  public errors?: ValidationErrors;

  public get value() {
    return this._value;
  }

  @Output()
  public changeValue: EventEmitter<SelectOptions> = new EventEmitter<SelectOptions>();

  @Input()
  public set value(val) {
    this._value = val;
    this.setDefaultValue();
  }

  @Input()
  public options: SelectOptions[] = [];

  @Input()
  public searchable: boolean = false;

  @Input()
  public disabled: boolean = false;

  @Input()
  public requiredPlaceholder: boolean = false;

  @Input()
  public multiple: boolean = false;

  @Input()
  public placeholder: string = 'Select value...';

  @ViewChild('input')
  public inputElement!: ElementRef<HTMLInputElement>;

  @HostListener('getErrors', ['$event'])
  public getErrors(event: ValidationErrors) {
    this.errors = event;
  }

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  public ngOnChanges(): void {
    this.displayOptions = JSON.parse(JSON.stringify(this.options));
    this.setDefaultValue();
  }

  public setDefaultValue(): void {
    if (!this.multiple) {
      if (this._value) {
        const element = DeepSearchHelper.findFirstObject(this.options, String(this._value), true);
        this.displayValue = element ? element.displayName : '';
      } else {
        this.displayValue = '';
      }
    } else {
      if (this._value) {
        const elementList = DeepSearchHelper.search(this.options, String(this._value));
        this.multipleDisplayValue =
          elementList && elementList.length > 0 ? elementList.map((el) => el.displayName) : [];
      } else {
        this.multipleDisplayValue = [];
      }
    }
  }

  public optionSelected(option: SelectOptions): void {
    this.changeValue.emit(option);
    if (!this.multiple) {
      this.onChange(option.value);
      this.closeOptionsList();
      this.value = option.value;
      this.displayValue = option.displayName;
    } else {
      const foundIndex = (this.value as unknown[]).indexOf(option.value);

      if (foundIndex > -1) {
        this.value = (this.value as unknown[]).filter((el) => el !== option.value);
      } else {
        if (this.value && Array.isArray(this.value)) {
          this.value.push(option.value);
        } else {
          this.value = [option.value];
        }
        this.onChange(this.value);
      }

      this.multipleDisplayValue = this.options
        .filter((optionElement) => !!(this.value as unknown[]).includes(optionElement.value))
        .map((el) => el.displayName);
    }
  }

  public searchInOptions(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.trim()) {
      this.displayOptions = DeepSearchHelper.search<SelectOptions>(
        JSON.parse(JSON.stringify(this.options)),
        searchTerm,
      );
    } else {
      this.displayOptions = JSON.parse(JSON.stringify(this.options));
    }
  }

  public openOptionsList(): void {
    this.optionsListOpened = true;
  }

  public isOptionSelected(option: SelectOptions) {
    return (this.value as unknown[]).indexOf(option.value) > -1;
  }

  public closeOptionsList(): void {
    this.optionsListOpened = false;
    if (this.multiple) {
      this.inputElement.nativeElement.value = this.multipleDisplayValue.join(', ');
    } else {
      this.inputElement.nativeElement.value = this.displayValue;
    }
    this.displayOptions = JSON.parse(JSON.stringify(this.options));
    this.changeDetectorRef.detectChanges();
  }

  public registerOnChange(fn: () => unknown): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => unknown): void {
    this.onTouched = fn;
  }

  public writeValue(obj: unknown): void {
    this.value = obj;
  }

  private onChange(value: unknown): unknown {
    return value;
  }

  private onTouched() {}

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
