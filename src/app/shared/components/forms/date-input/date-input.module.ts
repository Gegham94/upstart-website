import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputComponent } from './components/date-input.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { IconModule } from '../../icon/icon.module';

@NgModule({
  declarations: [DateInputComponent],
  imports: [CommonModule, DpDatePickerModule, IconModule],
  exports: [DateInputComponent],
})
export class DateInputModule {}
