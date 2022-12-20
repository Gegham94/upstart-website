import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from './../../shared/components/button/button.module';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, ButtonModule, TranslateModule],
})
export class NotFoundModule {}
