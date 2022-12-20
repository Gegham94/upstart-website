import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CourseType } from 'src/app/shared/enums/course-type.enum';
import { Currency } from 'src/app/shared/enums/currency';
import { PublicCourse } from 'src/app/shared/interfaces/courses/public-course.interface';
import { CurrentUserInfoInterface } from 'src/app/shared/interfaces/current-user.interface';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { CourseCountService } from 'src/app/shared/services/course-count/course-count.service';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { ButtonTheme } from '../../../enums/button-theme.enum';
@Component({
  selector: 'us-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss', './course.component.media.scss'],
})
export class CourseComponent {
  @Input()
  public courseData!: PublicCourse;

  @Input()
  public hideBasketAndWishList: boolean = false;

  @Output()
  public removedFromWishList$: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public basketEvent$: EventEmitter<boolean> = new EventEmitter<boolean>();

  public readonly buttonTheme = ButtonTheme;

  public currentUser: CurrentUserInfoInterface;

  public isLoggedIn: boolean = false;

  public showLoader: boolean = false;

  constructor(
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private basketService: BasketService,
    private favoriteService: FavoritesService,
    private courseCountService: CourseCountService,
    private globalService: GlobalService,
  ) {}

  public addToCart(id: number, data: PublicCourse) {
    if (this.globalService.isAuthenticated) this.showLoader = true;
    this.basketService.addToBasket(id).subscribe(
      () => {
        this.basketEvent$.emit(true);
        this.showLoader = false;
        data.in_basket = 1;
        this.courseCountService.coursesInBasket$.next(1);
        this.toastrService.success(this.translateService.instant('basket.add_success'));
      },
      () => {
        this.showLoader = false;
        this.toastrService.error(this.translateService.instant('basket.add_fail'));
      },
    );
  }

  public removeFromBasket(id: number, data: PublicCourse): void {
    this.showLoader = true;
    this.basketService.deleteFromBasket(id).subscribe(
      () => {
        this.basketEvent$.emit(true);
        this.showLoader = false;
        this.toastrService.success(this.translateService.instant('basket.delete_success'));
        data.in_basket = 0;
        this.courseCountService.coursesInBasket$.next(0);
      },
      () => {
        this.toastrService.error(this.translateService.instant('favorites.error'));
        this.showLoader = false;
      },
    );
  }

  public addToWishList(id: number, data: PublicCourse) {
    if (this.globalService.isAuthenticated) this.showLoader = true;
    this.favoriteService.addIntoFavorites(id).subscribe(
      () => {
        data.in_wishlist = 1;
        this.showLoader = false;
        this.courseCountService.coursesInWishList$.next(1);
        this.toastrService.success(this.translateService.instant('favorites.success'));
      },
      () => {
        this.showLoader = false;
        this.toastrService.error(this.translateService.instant('favorites.error'));
      },
    );
  }

  public removeFromWishList(id: number, data: PublicCourse): void {
    this.showLoader = true;
    this.favoriteService.removeFromWishList(id).subscribe(
      () => {
        this.removedFromWishList$.emit(true);
        data.in_wishlist = 0;
        this.toastrService.success(this.translateService.instant('favorites.remove-success'));
        this.courseCountService.coursesInWishList$.next(0);
        this.showLoader = false;
      },
      () => {
        this.showLoader = false;
        this.toastrService.error(this.translateService.instant('favorites.error'));
      },
    );
  }

  public get currencyType(): typeof Currency {
    return Currency;
  }

  public get courseType(): typeof CourseType {
    return CourseType;
  }
}
