import { CourseCountService } from './../../../../services/course-count/course-count.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CategoriesInterface } from '../../../../interfaces/categories/categories.interface';
import { Router } from '@angular/router';
import { GlobalService } from '../../../../services/global.service';
import { CurrentUserInfoInterface } from 'src/app/shared/interfaces/current-user.interface';
import { AuthorizationService } from 'src/app/shared/services/auth/authorization.service';
import { LangInterface } from 'src/app/shared/interfaces/lang.interface';
import { TranslateService } from '@ngx-translate/core';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'us-header-mobile-menu',
  templateUrl: './header-mobile-menu.component.html',
  styleUrls: ['./header-mobile-menu.component.scss'],
})
export class HeaderMobileMenuComponent implements OnInit, OnDestroy {
  @Input()
  public isLoggedIn: boolean = false;

  @Input()
  public set notifications(data: number) {
    if (data > 0) {
      this.unreadCount = data;
    }
  }

  @Input()
  public set showSearchMenu(data: boolean) {
    if (data) {
      this.isShowSearch = data;
      this.menuOpened = true;
    }
  }

  @Output()
  public closedSearch: EventEmitter<void> = new EventEmitter();

  @Input()
  public userInfo?: CurrentUserInfoInterface;

  public menuOpened: boolean = false;

  public categories: CategoriesInterface[] = [];

  public subcategories: CategoriesInterface[] | null = null;

  private readonly destroyed$: Subject<void> = new Subject<void>();

  public isOpenMenu: boolean = false;

  public unreadCount: number = 0;

  public languages = [
    { value: 'en', viewValue: 'ENG', src: 'eng_flag', fullValue: 'English' },
    { value: 'hy', viewValue: 'ARM', src: 'arm_flag', fullValue: 'Հայերեն' },
  ];

  public selectedLanguage: LangInterface | undefined;

  public openLanguages: boolean = false;

  public coursesInBasket: number = 0;

  public coursesInWishList: number = 0;

  public isShowSearch: boolean = false;

  constructor(
    private readonly globalService: GlobalService,
    private readonly router: Router,
    private readonly authorizationService: AuthorizationService,
    private readonly translateService: TranslateService,
    private readonly categoriesService: CategoriesService,
    private readonly courseCountService: CourseCountService,
  ) {}

  public ngOnInit(): void {
    this.globalService.categoriesListObservable
      .pipe(takeUntil(this.destroyed$))
      .subscribe((categories) => {
        this.categories = categories;
      });

    this.selectedLanguage = this.languages.find(
      (el) => el.value === this.translateService.currentLang,
    );

    this.courseCountService.coursesInBasket$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((bCount) => {
        if (bCount === 1) {
          this.coursesInBasket += 1;
        } else if (bCount === 0 && this.coursesInBasket !== 0) {
          this.coursesInBasket -= 1;
        } else {
          this.coursesInBasket = bCount;
        }
      });

    this.courseCountService.coursesInWishList$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((wCount) => {
        if (wCount === 1) {
          this.coursesInWishList += 1;
        } else if (wCount === 0 && this.coursesInWishList !== 0) {
          this.coursesInWishList -= 1;
        } else {
          this.coursesInWishList = wCount;
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public setSubcategories(value: CategoriesInterface[] | null): void {
    this.subcategories = value;
  }

  public openMobileMenu(): void {
    this.menuOpened = true;
  }

  public closeMobileMenu(): void {
    if (this.menuOpened) {
      this.menuOpened = false;
      this.subcategories = null;
      this.openLanguages = false;
      this.isOpenMenu = false;
      this.isShowSearch = false;
      this.closedSearch.emit();
    }
  }

  public openNotificationsPage() {
    this.router.navigateByUrl('/notifications');
    this.menuOpened = false;
  }

  public get nameFirstLetters() {
    if (!this.userInfo?.avatar) {
      return this.userInfo?.first_name[0]! + this.userInfo?.last_name[0];
    } else return;
  }

  public openMenu() {
    this.isOpenMenu = true;
  }

  public closeMenu() {
    this.isOpenMenu = false;
  }

  public logOut() {
    this.authorizationService.logout().subscribe(() => {
      this.router.navigate(['/']);
      this.menuOpened = false;
      this.isOpenMenu = false;
      this.coursesInBasket = 0;
      this.coursesInWishList = 0;
    });
  }

  public changeLanguage(value: string) {
    const newLang = value;
    this.translateService.use(newLang).subscribe(() => {
      this.selectedLanguage = this.languages.find(
        (el) => el.value === this.translateService.currentLang,
      );

      this.categoriesService.getCategories().subscribe();
    });
  }

  public closeLanguages(event: Event) {
    event.stopPropagation();
    this.openLanguages = false;
  }

  public openBasketPage() {
    this.menuOpened = false;
    this.router.navigateByUrl('/basket');
  }

  public closeSearchMenu() {
    this.isShowSearch = false;
    this.menuOpened = false;
  }
}
