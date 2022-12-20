import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './components/dashboard-layout.component';
import { DashboardHeaderModule } from '../../modules/dashboard-modules/dashboard-header/dashboard-header.module';
import { RouterModule } from '@angular/router';
import { DashboardSidebarModule } from '../../modules/dashboard-modules/dashboard-sidebar/dashboard-sidebar.module';
import { LoadingModule } from '../../components/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardHeaderModule,
    DashboardSidebarModule,
    LoadingModule,
    TranslateModule,
  ],
  exports: [DashboardLayoutComponent],
})
export class DashboardLayoutModule {}
