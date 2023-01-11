import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[usValidationError]',
})
export class ValidationErrorDirective implements OnInit {
  @Output()
  public getErrors: EventEmitter<{ [key: string]: string | string[] }> = new EventEmitter<{
    [p: string]: string | string[];
  }>();

  constructor(private readonly ngControl: NgControl) {}

  public ngOnInit(): void {
    if ((this.ngControl.touched || this.ngControl.dirty) && this.ngControl.errors) {
      this.getErrors.emit(this.ngControl.errors);
    }
    this.ngControl.statusChanges?.subscribe(() => {
      if ((this.ngControl.touched || this.ngControl.dirty) && this.ngControl.errors) {
        this.getErrors.emit(this.ngControl.errors);
      }
    });
    this.ngControl.valueChanges?.subscribe(() => {
      this.getErrors.emit({});
    });
  }
}
