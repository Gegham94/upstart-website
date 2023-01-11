import { ScrollTopModule } from '../../shared/components/scroll-top/scroll-top.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconModule } from '../../shared/components/icon/icon.module';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  declarations: [NotificationsComponent, NotificationDetailComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    TranslateModule,
    IconModule,
    NgxSkeletonLoaderModule,
    ScrollTopModule,
  ],
  providers: [],
})
export class NotificationsModule {}
