import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { IconModule } from '../icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [UserInfoComponent],
})
export class UserInfoModule {}
