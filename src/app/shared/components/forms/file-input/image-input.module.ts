import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageInputComponent } from './components/image-input.component';
import { IconModule } from '../../icon/icon.module';

@NgModule({
  declarations: [ImageInputComponent],
  exports: [ImageInputComponent],
  imports: [CommonModule, IconModule],
})
export class ImageInputModule {}
