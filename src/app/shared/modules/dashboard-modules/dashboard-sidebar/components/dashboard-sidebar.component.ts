import { Component, OnInit } from '@angular/core';
import { DashboardSidebarService } from '../../../../services/dashboard-sidebar.service';
import { CurrentUserInfoInterface } from '../../../../interfaces/current-user.interface';
import { UserRole } from '../../../../enums/user-role';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'us-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
})
export class DashboardSidebarComponent implements OnInit {
  public sidebarOpened: boolean = true;

  public user?: CurrentUserInfoInterface | null;

  public readonly userRole = UserRole;

  constructor(
    private readonly dashboardSidebarService: DashboardSidebarService,
    private globalService: GlobalService,
  ) {}

  public ngOnInit(): void {
    this.dashboardSidebarService.isOpened.subscribe((state) => {
      this.sidebarOpened = state;
    });
    this.globalService.currentUserObservable.subscribe((res) => {
      this.user = res;
    });
  }

  public get checkUserRole(): boolean {
    return this.user?.role_id !== UserRole.STUDENT;
  }
}
