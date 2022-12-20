import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select.component';
import { ClickOutsideModule } from '../../directives/click-outside/click-outside.module';
import { OptionListComponent } from './components/option-list/option-list.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [SelectComponent, OptionListComponent],
  imports: [CommonModule, ClickOutsideModule, IconModule],
  exports: [SelectComponent],
})
export class SelectModule {}
