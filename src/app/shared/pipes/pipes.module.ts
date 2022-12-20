import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPipe } from './category.pipe';
import { TranslateDatePipe } from './translate-date.pipe';

@NgModule({
  declarations: [CategoryPipe, TranslateDatePipe],
  imports: [CommonModule],
  exports: [CategoryPipe, TranslateDatePipe],
})
export class PipesModule {}
