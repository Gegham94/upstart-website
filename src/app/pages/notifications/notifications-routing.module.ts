import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NotificationsComponent } from './notifications.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: NotificationsComponent },
  { path: ':id', component: NotificationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsRoutingModule {}
