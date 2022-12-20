import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TrainerCourse } from 'src/app/shared/interfaces/courses/trainer-course';
import { CourseType } from '../../../enums/course-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { Currency } from 'src/app/shared/enums/currency';
import { FavoritesService } from 'src/app/shared/services/favorites/favorites.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { CourseCountService } from 'src/app/shared/services/course-count/course-count.service';

@Component({
  selector: 'us-course-ticket',
  templateUrl: './course-ticket.component.html',
  styleUrls: ['./course-ticket.component.scss', './course-ticket.component.media.scss'],
})
export class CourseTicketComponent {
  @Input()
  public course: TrainerCourse;

  @Input()
  public isBusket: boolean = false;

  @Output()
  public removeEmitter$: EventEmitter<boolean> = new EventEmitter<boolean>();

  public movedIntoWishList: boolean = false;

  public wishListLoader: boolean = false;

  public basketLoader: boolean = false;

  public mainLoader: boolean = false;

  public isMobile: boolean = false;

  constructor(
    private translateService: TranslateService,
    private favoriteService: FavoritesService,
    private toastrService: ToastrService,
    private courseCountService: CourseCountService,
    private basketService: BasketService,
  ) {
    this.isMobile = window.innerWidth <= 913;
  }

  public get getCurrency(): typeof Currency {
    return Currency;
  }

  public deleteFromBusket(id: number) {
    this.basketLoader = true;
    this.mainLoader = true;
    this.basketService.deleteFromBasket(id).subscribe(() => {
      this.courseCountService.coursesInBasket$.next(0);
      this.basketLoader = false;
      this.toastrService.success(this.translateService.instant('basket.delete_success'));
      this.removeEmitter$.emit(true);
    });
  }

  public addToWishList(id: number) {
    this.wishListLoader = true;
    this.favoriteService.addIntoFavorites(id).subscribe(
      () => {
        this.courseCountService.coursesInWishList$.next(1);
        this.toastrService.success(this.translateService.instant('favorites.success'));
        this.removeEmitter$.emit(true);
        this.movedIntoWishList = true;
        this.wishListLoader = false;
      },
      () => {
        this.toastrService.error(this.translateService.instant('favorites.error'));
        this.wishListLoader = false;
      },
    );
  }

  public removeFromWishList(id: number) {
    this.wishListLoader = true;
    this.favoriteService.removeFromWishList(id).subscribe(
      () => {
        this.courseCountService.coursesInWishList$.next(0);
        this.toastrService.success(this.translateService.instant('favorites.remove-success'));
        this.removeEmitter$.emit(true);
        this.movedIntoWishList = false;
        this.wishListLoader = false;
      },
      () => {
        this.toastrService.error(this.translateService.instant('favorites.remove-error'));
        this.wishListLoader = false;
      },
    );
  }

  public get courseType(): typeof CourseType {
    return CourseType;
  }
}
