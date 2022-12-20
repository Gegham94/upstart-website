import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [ConfirmationModalComponent],
  imports: [CommonModule, TranslateModule, ButtonModule],
})
export class ConfirmationModalModule {}
