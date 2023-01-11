import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './components/stats/stats.component';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,
    data: {
      dashboard: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardStatsRoutingModule {}
