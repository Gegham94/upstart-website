import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificateComponent } from './components/certificate.component';
import { IconModule } from 'src/app/shared/components/icon/icon.module';
import { ButtonModule } from '../button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [CertificateComponent],
  imports: [
    CommonModule,
    IconModule,
    ButtonModule,
    TranslateModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [CertificateComponent],
})
export class CertificateModule {}
