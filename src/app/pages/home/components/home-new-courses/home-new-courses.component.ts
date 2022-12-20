import { AfterViewInit, ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';

@Component({
  selector: 'us-home-new-courses',
  templateUrl: './home-new-courses.component.html',
  styleUrls: ['./home-new-courses.component.scss', './home-new-courses.component.media.scss'],
})
export class HomeNewCoursesComponent implements AfterViewInit {
  @ViewChild('slider')
  private slider?: SlickCarouselComponent;

  public carouselOptions!: {};

  public readonly buttonTheme = ButtonTheme;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject('PLATFORM_ID') private readonly platformId: string,
  ) {}

  public ngAfterViewInit(): void {
    this.carouselOptions = {
      slidesToShow: 3,
      sliderToScroll: 1,
      swipe: false,
      arrows: true,
      infinite: false,
      centerMode: false,
      prevArrow: '.home-new-courses__slider-arrow_left',
      nextArrow: '.home-new-courses__slider-arrow_right',
      appendArrows: '.home-new-courses__slider-arrows',
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
}
