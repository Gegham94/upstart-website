import { Component, OnInit } from '@angular/core';
import { DashboardSidebarService } from '../../../services/dashboard-sidebar.service';

@Component({
  selector: 'us-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  public sidebarOpened: boolean = false;

  constructor(private readonly dashboardSidebarService: DashboardSidebarService) {}

  public ngOnInit(): void {
    this.dashboardSidebarService.isOpened.subscribe((state) => {
      this.sidebarOpened = state;
    });
  }
}
