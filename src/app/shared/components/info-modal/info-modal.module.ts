import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { InfoModalComponent } from './info-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [InfoModalComponent],
  imports: [CommonModule, IconModule, TranslateModule, ButtonModule],
  exports: [InfoModalComponent],
})
export class InfoModalModule {}
