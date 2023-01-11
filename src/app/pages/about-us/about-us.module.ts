import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollTopModule } from 'src/app/shared/components/scroll-top/scroll-top.module';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [CommonModule, AboutUsRoutingModule, TranslateModule, ScrollTopModule],
})
export class AboutUsModule {}
