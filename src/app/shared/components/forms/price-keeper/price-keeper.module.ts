import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceKeeperComponent } from './components/price-keeper.component';
import { ClickOutsideModule } from '../../../directives/click-outside/click-outside.module';
import { IconModule } from '../../icon/icon.module';

@NgModule({
  declarations: [PriceKeeperComponent],
  imports: [CommonModule, ClickOutsideModule, IconModule],
  exports: [PriceKeeperComponent],
})
export class PriceKeeperModule {}
