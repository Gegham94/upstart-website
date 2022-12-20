import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [OverlayModule],
  declarations: [DropdownDirective],
  exports: [DropdownDirective],
})
export class DropdownModule {}
