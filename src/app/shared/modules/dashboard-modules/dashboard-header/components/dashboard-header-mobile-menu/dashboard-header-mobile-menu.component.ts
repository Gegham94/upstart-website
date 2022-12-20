import { Component, Input } from '@angular/core';

@Component({
  selector: 'us-dashboard-header-mobile-menu',
  templateUrl: './dashboard-header-mobile-menu.component.html',
  styleUrls: ['./dashboard-header-mobile-menu.component.scss'],
})
export class DashboardHeaderMobileMenuComponent {
  @Input()
  public isLoggedIn: boolean = false;

  public menuOpened: boolean = false;

  public openMobileMenu(): void {
    this.menuOpened = true;
  }

  public closeMobileMenu(): void {
    if (this.menuOpened) {
      this.menuOpened = false;
    }
  }
}
