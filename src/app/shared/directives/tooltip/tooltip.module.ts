import { NgModule } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { TooltipComponent } from './components/tooltip.component';

@NgModule({
  imports: [OverlayModule],
  declarations: [TooltipDirective, TooltipComponent],
  exports: [TooltipDirective],
})
export class TooltipModule {}
