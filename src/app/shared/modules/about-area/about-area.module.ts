import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutAreaComponent } from './components/about-area.component';
import { IconModule } from '../../components/icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AboutAreaComponent],
  imports: [CommonModule, IconModule, TranslateModule],
  exports: [AboutAreaComponent],
})
export class AboutAreaModule {}
