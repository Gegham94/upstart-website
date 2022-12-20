import { Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

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
    if (this.ngControl.errors) {
      this.getErrors.emit(this.ngControl.errors);
    }
    this.ngControl.statusChanges?.pipe(debounceTime(200)).subscribe(() => {
      if (this.ngControl.errors) {
        this.getErrors.emit(this.ngControl.errors);
      }
    });
    this.ngControl.valueChanges?.pipe(debounceTime(200)).subscribe(() => {
      this.getErrors.emit({});
    });
  }
}
