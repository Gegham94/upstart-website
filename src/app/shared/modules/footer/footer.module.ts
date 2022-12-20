import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { IconModule } from '../../components/icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [CommonModule, IconModule, TranslateModule, RouterModule],
})
export class FooterModule {}
