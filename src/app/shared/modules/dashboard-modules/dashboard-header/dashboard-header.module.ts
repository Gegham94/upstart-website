import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './components/dashboard-header.component';
import { ButtonModule } from '../../../components/button/button.module';
import { HeaderModule } from '../../header/header.module';
import { RouterModule } from '@angular/router';
import { DashboardHeaderMobileMenuComponent } from './components/dashboard-header-mobile-menu/dashboard-header-mobile-menu.component';
import { IconModule } from '../../../components/icon/icon.module';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideModule } from '../../../directives/click-outside/click-outside.module';

@NgModule({
  declarations: [DashboardHeaderComponent, DashboardHeaderMobileMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    HeaderModule,
    IconModule,
    TranslateModule,
    ClickOutsideModule,
  ],
  exports: [DashboardHeaderComponent],
})
export class DashboardHeaderModule {}
