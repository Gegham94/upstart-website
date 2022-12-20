import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthAttantionComponent } from './components/auth-attantion/auth-attantion.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '../../components/icon/icon.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { VideoArticleModalComponent } from './components/video-article-modal/video-article-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthAttantionComponent, ConfirmModalComponent, VideoArticleModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    TranslateModule,
    IconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ModalModule {}
