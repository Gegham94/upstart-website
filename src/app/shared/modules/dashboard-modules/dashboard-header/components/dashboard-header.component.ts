import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardSidebarService } from '../../../../services/dashboard-sidebar.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { CurrentUserInfoInterface } from 'src/app/shared/interfaces/current-user.interface';
import { AuthorizationService } from 'src/app/shared/services/auth/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'us-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  private readonly mobileMaxWidth: number = 580;

  public isMobile: boolean = false;

  public isScrolled: boolean = false;

  public isSidebarOpened: boolean = false;

  public userInfo?: CurrentUserInfoInterface;

  public unreadCount: number = 0;

  public loggedIn: boolean;

  @ViewChild('sideMenuToggler')
  public sideMenuToggler!: ElementRef<HTMLElement>;

  @HostListener('window:resize', ['$event'])
  public resizeHandler(event: Event) {
    this.isMobile = (event.target as Window).innerWidth <= this.mobileMaxWidth;
  }

  @HostListener('window:scroll', ['$event'])
  public scrollHandler(event: Event) {
    if (event.cancelable) event.preventDefault();

    this.isScrolled = window.scrollY > 0;
  }

  constructor(
    private readonly dashboardSidebarService: DashboardSidebarService,
    @Inject('PLATFORM_ID') private readonly platformId: string,
    private readonly globalService: GlobalService,
    private readonly authorizationService: AuthorizationService,
    private router: Router,
  ) {
    this.authorizationService.authToken.subscribe((token: string) => {
      this.loggedIn = !!token;
    });
  }

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('scroll'));
    }

    this.dashboardSidebarService.isOpened.subscribe((state) => {
      this.isSidebarOpened = state;
    });

    this.getCurrentUserInfo();
  }

  public toggleSidebar(): void {
    this.dashboardSidebarService.setOpenedState(!this.isSidebarOpened);
  }

  private getCurrentUserInfo() {
    this.globalService.currentUserObservable.subscribe((data) => {
      if (data) {
        this.userInfo = data;
      }
    });
  }

  public logOut() {
    this.sideMenuToggler.nativeElement.click();
    this.authorizationService.logout().subscribe(() => {
      this.router.navigate(['/']);
      this.loggedIn = false;
    });
  }

  public get nameFirstLetters() {
    if (!this.userInfo?.avatar) {
      return this.userInfo?.first_name[0]! + this.userInfo?.last_name[0];
    } else return;
  }
}
