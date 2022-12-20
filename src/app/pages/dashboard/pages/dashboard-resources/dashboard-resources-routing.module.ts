import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardResourcesComponent } from './components/dashboard-resources/dashboard-resources.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardResourcesComponent,
    data: {
      dashboard: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardResourcesRoutingModule {}
