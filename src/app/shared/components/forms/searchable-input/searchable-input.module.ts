import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchableInputComponent } from './components/searchable-input.component';
import { InputModule } from '../input/input.module';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from '../../../directives/click-outside/click-outside.module';

@NgModule({
  declarations: [SearchableInputComponent],
  imports: [CommonModule, InputModule, FormsModule, ClickOutsideModule],
  exports: [SearchableInputComponent],
})
export class SearchableInputModule {}
