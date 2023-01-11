import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { ScrollTopModule } from 'src/app/shared/components/scroll-top/scroll-top.module';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [CommonModule, ContactUsRoutingModule, TranslateModule, ButtonModule, ScrollTopModule],
})
export class ContactUsModule {}
