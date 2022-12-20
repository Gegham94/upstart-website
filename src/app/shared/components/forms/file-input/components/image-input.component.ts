import { Component, ElementRef, forwardRef, HostListener, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'us-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageInputComponent),
      multi: true,
    },
  ],
})
export class ImageInputComponent implements ControlValueAccessor {
  public uploadedFile?: File;

  public uploadedFileList: File[] = [];

  public displayImages: (string | ArrayBuffer)[] = [];

  @Input()
  public disabled: boolean = false;

  @Input()
  public multiple: boolean = false;

  @Input()
  public requiredPlaceholder: boolean = false;

  public defaultFileUrl: string = '';

  public errors?: ValidationErrors;

  @Input()
  public set value(val) {
    if (val) {
      if (typeof val !== 'string') {
        if (Array.isArray(val)) {
          this.uploadedFileList = val;
        } else {
          this.uploadedFile = val;
        }
        this.defaultFileUrl = '';
      } else {
        this.defaultFileUrl =
          'https://upstart.brainfors.am/' +
          (val.indexOf('https://') > -1
            ? val.replace(/https:\/\/upstart.brainfors.am\//gm, '')
            : val);
        this.displayImages = [this.defaultFileUrl];
      }
    } else {
      this.uploadedFileList = [];
      this.uploadedFile = undefined;
      this.defaultFileUrl = '';
      this.displayImages = [];
    }
  }

  @ViewChild('input')
  public input!: ElementRef<HTMLInputElement>;

  @HostListener('getErrors', ['$event'])
  public getErrors(event: ValidationErrors) {
    this.errors = event;
  }

  public registerOnChange(fn: () => File | File[] | string): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => File | File[] | string): void {
    this.onTouched = fn;
  }

  public writeValue(obj: File | File[] | string): void {
    this.value = obj;
  }

  private onChange(value?: File | File[] | string): File | File[] | string | undefined {
    return value;
  }

  private onTouched() {}

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public fileUploaded(event: Event): void {
    const fileList = (event.target as HTMLInputElement).files as FileList;
    this.addFileList(fileList);
    this.input.nativeElement.files = null;
    this.input.nativeElement.value = '';

    this.onChange(this.multiple ? this.uploadedFileList : this.uploadedFile);
  }

  public fileRemoved(index: number): void {
    if (this.multiple) {
      this.uploadedFileList.splice(index, 1);
      this.onChange(this.uploadedFileList);
    } else {
      this.uploadedFile = undefined;
      this.onChange(this.uploadedFile);
    }

    this.displayImages.splice(index, 1);
    this.defaultFileUrl = '';
  }

  public openFileInput(): void {
    this.input.nativeElement.click();
  }

  private addFileList(fileList: FileList): void {
    const fileReader = new FileReader();
    this.displayImages = [];
    let index = 0;

    fileReader.onload = () => {
      if (fileReader.result) {
        this.displayImages.push(fileReader.result);
      }
      if (this.multiple) {
        index++;

        if (this.uploadedFileList[index]) {
          fileReader.readAsDataURL(this.uploadedFileList[index]);
        }
      }
    };

    if (this.multiple) {
      this.uploadedFileList!.push(...Array.from(fileList));
      fileReader.readAsDataURL(this.uploadedFileList[index]);
    } else {
      this.uploadedFile = fileList[0];
      fileReader.readAsDataURL(this.uploadedFile);
    }
  }

  public get value() {
    if (!this.defaultFileUrl) {
      if (this.multiple) {
        return this.uploadedFileList;
      } else {
        return this.uploadedFile;
      }
    } else {
      return this.defaultFileUrl;
    }
  }
}
