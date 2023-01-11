import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './components/select.component';
import { ClickOutsideModule } from '../../directives/click-outside/click-outside.module';
import { OptionListComponent } from './components/option-list/option-list.component';
import { IconModule } from '../icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SelectComponent, OptionListComponent],
  imports: [CommonModule, ClickOutsideModule, IconModule, TranslateModule],
  exports: [SelectComponent],
})
export class SelectModule {}
