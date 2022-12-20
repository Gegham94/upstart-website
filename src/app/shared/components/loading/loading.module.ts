import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading.component';
import { LoadingService } from '../../services/loading.service';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule],
  exports: [LoadingComponent],
  providers: [LoadingService],
})
export class LoadingModule {}
