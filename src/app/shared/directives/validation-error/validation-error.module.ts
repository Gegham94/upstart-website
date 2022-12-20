import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrorDirective } from './validation-error.directive';

@NgModule({
  declarations: [ValidationErrorDirective],
  imports: [CommonModule],
  exports: [ValidationErrorDirective],
})
export class ValidationErrorModule {}
