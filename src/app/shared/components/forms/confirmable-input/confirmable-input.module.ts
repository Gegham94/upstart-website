import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmableInputComponent } from './components/confirmable-input.component';
import { InputModule } from '../input/input.module';
import { ButtonModule } from '../../button/button.module';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from '../../../directives/click-outside/click-outside.module';

@NgModule({
  declarations: [ConfirmableInputComponent],
  imports: [CommonModule, FormsModule, InputModule, ButtonModule, ClickOutsideModule],
  exports: [ConfirmableInputComponent],
})
export class ConfirmableInputModule {}
