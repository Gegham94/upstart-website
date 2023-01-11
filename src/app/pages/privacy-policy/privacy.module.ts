import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollTopModule } from 'src/app/shared/components/scroll-top/scroll-top.module';

@NgModule({
  declarations: [PrivacyComponent],
  imports: [CommonModule, PrivacyRoutingModule, TranslateModule, ScrollTopModule],
})
export class PrivacyModule {}
