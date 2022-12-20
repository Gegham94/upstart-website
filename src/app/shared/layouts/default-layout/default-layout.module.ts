import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './components/default-layout.component';
import { FooterModule } from '../../modules/footer/footer.module';
import { HeaderModule } from '../../modules/header/header.module';
import { LoadingModule } from '../../components/loading/loading.module';

@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [CommonModule, FooterModule, HeaderModule, LoadingModule],
  exports: [DefaultLayoutComponent],
})
export class DefaultLayoutModule {}
