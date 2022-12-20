import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './component/students.component';
import { TooltipModule } from '../../directives/tooltip/tooltip.module';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, RouterModule, TranslateModule, TooltipModule],
  exports: [StudentsComponent],
})
export class StudentsModule {}
