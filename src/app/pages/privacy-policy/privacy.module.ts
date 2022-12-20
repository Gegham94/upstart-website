import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PrivacyComponent],
  imports: [CommonModule, PrivacyRoutingModule, TranslateModule],
})
export class PrivacyModule {}
