import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewChild,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { isPlatformBrowser } from '@angular/common';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';
import { PublicCourse } from 'src/app/shared/interfaces/courses/public-course.interface';
import { CourseType } from 'src/app/shared/enums/course-type.enum';
import { Currency } from 'src/app/shared/enums/currency';
import { GlobalService } from '../../../services/global.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { IsPreviewService } from 'src/app/shared/services/is-preview/is-preview.service';

@Component({
  selector: 'us-course-slider',
  templateUrl: './course-slider.component.html',
  styleUrls: ['./course-slider.component.scss', './course-slider.component.media.scss'],
})
export class CourseSliderComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('slider')
  private slider?: SlickCarouselComponent;

  @Input()
  public slideToShow: number = 3;

  @Input()
  public set updateCarousel(event: boolean) {
    this.getCourses();
  }

  @Input()
  public slideToScroll: number = 1;

  @Input()
  public canSwipe: boolean = false;

  @Input()
  public showArrows: boolean = true;

  @Input()
  public isFinite: boolean = false;

  @Input()
  public show: string = 'courses';

  @Output()
  public addIntoBasket$: EventEmitter<boolean> = new EventEmitter<boolean>();

  public dataToShow: PublicCourse[];

  public arr = new Array(5);

  public carouselOptions!: {};

  public readonly buttonTheme = ButtonTheme;

  public loader: boolean = true;

  public isLoggedIn: boolean = false;

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public isPreview: boolean = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly globalService: GlobalService,
    @Inject('PLATFORM_ID') private readonly platformId: string,
    private isPreviewService: IsPreviewService,
  ) {
    this.isPreview = this.isPreviewService.isPreview();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public ngOnChanges(): void {
    switch (this.show.toLowerCase()) {
      case 'courses':
        this.getCourses();
        break;
    }
  }

  public ngAfterViewInit(): void {
    this.carouselOptions = {
      slidesToShow: this.slideToShow,
      sliderToScroll: this.slideToScroll,
      swipe: this.canSwipe,
      arrows: this.showArrows,
      infinite: this.isFinite,
      centerMode: false,
      prevArrow: '.course-related__slider-arrow_left',
      nextArrow: '.course-related__slider-arrow_right',
      appendArrows: '.course-related__slider-arrows',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            sliderToScroll: 1,
            swipe: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            sliderToScroll: 1,
            swipe: true,
          },
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 3,
            sliderToScroll: 1,
            swipe: false,
          },
        },
      ],
    };
    if (this.slider && isPlatformBrowser(this.platformId)) {
      // Reinitialize slick slider with new configs
      this.slider.unslick();
      this.slider.config = this.carouselOptions;
      this.slider.initSlick();
      this.changeDetectorRef.detectChanges();
    }
  }

  private getCourses(): void {
    this.globalService.getCoursesByLangList
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((res) => res !== null),
      )
      .subscribe((res) => {
        this.dataToShow = res;
        this.translateType();
        this.loader = false;
      });
  }

  private translateType() {}

  public basketEvent(): void {
    this.getCourses();
    this.addIntoBasket$.emit();
  }

  public get currencyType(): typeof Currency {
    return Currency;
  }

  public get courseType(): typeof CourseType {
    return CourseType;
  }
}
