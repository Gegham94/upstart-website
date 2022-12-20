import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSidebarComponent } from './components/dashboard-sidebar.component';
import { RouterModule } from '@angular/router';
import { DashboardSidebarService } from '../../../services/dashboard-sidebar.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardSidebarComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
  exports: [DashboardSidebarComponent],
  providers: [DashboardSidebarService],
})
export class DashboardSidebarModule {}
