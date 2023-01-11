import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EmailSubscribeComponent } from './components/email-subscribe.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EmailSubscribeComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, TranslateModule],
})
export class EmailSubscribeModule {}
