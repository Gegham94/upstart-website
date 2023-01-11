import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningMessageComponent } from './component/warning-message.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [WarningMessageComponent],
  exports: [WarningMessageComponent],
  imports: [CommonModule, ButtonModule, IconModule, TranslateModule],
})
export class WarningMessageModule {}
