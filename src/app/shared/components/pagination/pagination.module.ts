import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [PaginationComponent],
  providers: [],
})
export class PaginationModule {}
