import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input.component';
import { IconModule } from '../../icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationErrorModule } from '../../../directives/validation-error/validation-error.module';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, IconModule, TranslateModule, ValidationErrorModule],
  exports: [InputComponent],
})
export class InputModule {}
