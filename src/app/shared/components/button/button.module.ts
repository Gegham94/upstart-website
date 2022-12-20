import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button.component';
import { IconModule } from '../icon/icon.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
  imports: [CommonModule, IconModule, MatProgressSpinnerModule],
})
export class ButtonModule {}
