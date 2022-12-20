import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { CourseDetails } from 'src/app/shared/interfaces/courses/course-details';
import { CourseType } from 'src/app/shared/enums/course-type.enum';
import { ButtonTheme } from '../../../../../../shared/enums/button-theme.enum';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Currency } from '../../../../../../shared/enums/currency';
import { CoursesApiService } from 'src/app/shared/services/courses/courses-api.service';
import { ActivatedRoute } from '@angular/router';
import { IsPreviewService } from 'src/app/shared/services/is-preview/is-preview.service';
import { GlobalService } from '../../../../../../shared/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthAttantionComponent } from '../../../../../../shared/modules/modal/components/auth-attantion/auth-attantion.component';
import { BasketService } from '../../../../../../shared/services/basket/basket.service';
import { GoToClassService } from '../../../../../../shared/services/go-to-class/go-to-class.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CourseCountService } from '../../../../../../shared/services/course-count/course-count.service';
import { CertificateComponent } from '../../../../../../shared/components/certificate/components/certificate.component';

@Component({
  selector: 'us-course-general-side',
  templateUrl: './course-general-side.component.html',
  styleUrls: ['./course-general-side.component.scss', './course-general-side.component.media.scss'],
})
export class CourseGeneralSideComponent implements OnInit, OnChanges {
  @Input()
  public course?: CourseDetails;

  @Input()
  public preview: boolean = false;

  @Output()
  public reloadData: EventEmitter<boolean | number> = new EventEmitter<boolean | number>();

  public videoUrl: SafeResourceUrl = '';

  public readonly buttonTheme = ButtonTheme;

  public readonly CourseType = CourseType;

  public isPreview: boolean = false;

  public isJoined: boolean = false;

  public showLoader: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private courseService: CoursesApiService,
    private activatedRoute: ActivatedRoute,
    private isPreviewService: IsPreviewService,
    private globalService: GlobalService,
    private dialog: MatDialog,
    private basketService: BasketService,
    private goToClassService: GoToClassService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private courseCountService: CourseCountService,
  ) {
    this.isPreview = this.isPreviewService.isPreview();
  }

  public ngOnInit() {
    if (this.course?.promo_video) {
      let embedUrl = this.embedVideo(this.course?.promo_video);
      this.videoUrl = this.getSafeUrl(embedUrl);
      this.checkIsUserAuth();
    }
  }

  public ngOnChanges(): void {
    if (this.preview) {
      this.getPreviewDetails();
    }
    this.showLoader = false;
  }

  public embedVideo(url: string) {
    let youtubeRegExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let yt = url.match(youtubeRegExp);
    if (yt) return '//www.youtube.com/embed/' + yt[1];
    return '';
  }

  public getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public get getCurrency(): typeof Currency {
    return Currency;
  }

  public getPreviewDetails(): void {
    let id = -1;
    this.activatedRoute.params.subscribe((param) => {
      id = param['id'];
    });
    this.courseService.coursePreviewDetails(id).subscribe((res) => {
      this.course = res.data;
    });
  }

  public isAuthUser(): boolean {
    return this.globalService.isAuthenticated;
  }

  public get courseType(): typeof CourseType {
    return CourseType;
  }

  public get isGoToClass(): boolean {
    return this.course?.type_id === this.courseType.ONLINE && this.course.price == 0;
  }

  public joinToClass(course: CourseDetails | undefined): void {
    this.showLoader = true;
    if (!this.checkIsUserAuth()) {
      this.openAuthModal();
    } else {
      if (course)
        this.goToClassService.joinToClass(course.id).subscribe(
          (res) => {
            this.showLoader = false;
            this.reloadData.emit(-1);
            if (res.success) {
              this.isJoined = true;
            } else {
              this.isJoined = false;
            }
            this.toastrService.success(this.translateService.instant('global.joined'));
          },
          (error) => {
            this.toastrService.error(error);
          },
        );
    }
  }

  public addToCartAction(course: CourseDetails | undefined): void {
    this.showLoader = true;
    if (course)
      this.basketService.addToBasket(course.id).subscribe(
        () => {
          this.reloadData.emit(true);
          this.toastrService.success(this.translateService.instant('basket.add_success'));
          this.courseCountService.coursesInBasket$.next(1);
        },
        () => {
          this.toastrService.error(this.translateService.instant('basket.add_fail'));
        },
      );
  }

  private checkIsUserAuth(): boolean {
    return this.globalService.isAuthenticated;
  }

  private openAuthModal(): void {
    this.dialog.open(AuthAttantionComponent, {
      panelClass: 'attention-dialog',
      maxWidth: '600px',
    });
  }

  public removeFromCart(course: CourseDetails | undefined) {
    this.showLoader = true;
    if (course)
      this.basketService.deleteFromBasket(course.id).subscribe(
        () => {
          this.reloadData.emit(true);
          this.courseCountService.coursesInBasket$.next(0);
          this.toastrService.success(this.translateService.instant('basket.delete_success'));
        },
        (err) => {
          this.toastrService.error(err);
        },
      );
  }

  public openCertificateModal() {
    this.dialog.open(CertificateComponent, {
      data: {
        type: 'pdf',
        course: this.course?.id,
      },
      panelClass: 'certificate-dialog',
      width: '900px',
      height: '600px',
    });
  }
}
