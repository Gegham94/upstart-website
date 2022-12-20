import { PublicCourse } from './../../../interfaces/courses/public-course.interface';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../services/global.service';
import { CurrentUserInfoInterface } from '../../../../shared/interfaces/current-user.interface';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { Subject, takeUntil } from 'rxjs';
import { CourseCountService } from 'src/app/shared/services/course-count/course-count.service';
import { CourseType } from 'src/app/shared/enums/course-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'us-inline-course',
  templateUrl: './inline-course.component.html',
  styleUrls: ['./inline-course.component.scss', './inline-course.component.media.scss'],
})
export class InlineCourseComponent implements OnInit, OnDestroy {
  @Input()
  public courseData!: PublicCourse;

  public typePosition: boolean = false;

  public starRate: number;

  public typeColor: string = '';

  public readonly buttonTheme = ButtonTheme;

  public userInfo?: CurrentUserInfoInterface;

  public isLogedIn: boolean = false;

  public showBasketLoader: boolean = false;

  public showWishListLoader: boolean = false;

  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private translateService: TranslateService,
    private globalService: GlobalService,
    private basketService: BasketService,
    private toastrService: ToastrService,
    private favoriteService: FavoritesService,
    private courseCountService: CourseCountService,
    public router: Router,
  ) {
    this.globalService.currentUserObservable.subscribe((data) => {
      if (data) {
        this.userInfo = data;
        this.isLogedIn = true;
      } else {
        this.isLogedIn = false;
      }
    });
  }

  public ngOnInit(): void {
    this.typePosition = window.innerWidth >= 480;
    if (this.courseData.rating) {
      this.starRate = Number(Number(this.courseData.rating).toFixed(1));
    }
  }

  public addToCard(id: number, data: PublicCourse) {
    if (this.globalService.isAuthenticated) this.showBasketLoader = true;
    this.basketService
      .addToBasket(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.courseCountService.coursesInBasket$.next(1);
          data.in_basket = 1;
          this.showBasketLoader = false;
          this.toastrService.success(this.translateService.instant('basket.add_success'));
        },
        () => {
          this.toastrService.error(this.translateService.instant('basket.add_fail'));
        },
      );
  }

  public addToWishlist(courseId: number, data: PublicCourse) {
    if (this.globalService.isAuthenticated) this.showWishListLoader = true;
    this.favoriteService
      .addIntoFavorites(courseId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.courseCountService.coursesInWishList$.next(1);
          data.in_wishlist = 1;
          this.showWishListLoader = false;
          this.toastrService.success(this.translateService.instant('favorites.success'));
        },
        () => {
          this.toastrService.error(this.translateService.instant('favorites.error'));
        },
      );
  }

  public deleteFromBasket(id: number, data: PublicCourse): void {
    this.showBasketLoader = true;
    this.basketService
      .deleteFromBasket(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.courseCountService.coursesInBasket$.next(0);
          data.in_basket = 0;
          this.showBasketLoader = false;
          this.toastrService.success(this.translateService.instant('basket.delete_success'));
        },
        () => {
          this.toastrService.error(this.translateService.instant('basket.add_fail'));
        },
      );
  }

  public deleteFromWishList(id: number, data: PublicCourse): void {
    this.showWishListLoader = true;
    this.favoriteService
      .removeFromWishList(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.courseCountService.coursesInWishList$.next(0);
          data.in_wishlist = 0;
          this.showWishListLoader = false;
          this.toastrService.success(this.translateService.instant('favorites.success'));
        },
        () => {
          this.toastrService.error(this.translateService.instant('favorites.error'));
          this.showWishListLoader = false;
        },
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  public get courseType(): typeof CourseType {
    return CourseType;
  }

  public viewDetails(id: number) {
    this.router.navigate([`/dashboard/students/courses/lessons/${id}`]);
  }
}
