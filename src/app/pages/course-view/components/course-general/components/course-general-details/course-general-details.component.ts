import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { CourseDetails } from 'src/app/shared/interfaces/courses/course-details';
import { ArrayConvertService } from 'src/app/shared/services/array-convert/array-convert.service';
import { IsPreviewService } from 'src/app/shared/services/is-preview/is-preview.service';

@Component({
  selector: 'us-course-general-details',
  templateUrl: './course-general-details.component.html',
  styleUrls: [
    './course-general-details.component.scss',
    './course-general-details.component.media.scss',
  ],
})
export class CourseGeneralDetailsComponent implements OnChanges, AfterViewInit {
  @ViewChild('mainBlock')
  public mainBlock: ElementRef;

  private readonly maxRatingNumber: number = 5;

  public ratingNumbers: number[] = [];

  private _rating: number = 3.1;

  public isDescriptionToggled: boolean = false;

  public courseWill_learn: string[] = [];

  public courseRequirements: string[] = [];

  @Input()
  public set rating(value: number) {
    this._rating = Math.round(value);
  }

  @Input()
  public course: CourseDetails;

  public showCoverSide: boolean;

  public showBtn: boolean;

  @Input()
  public preview: boolean = false;

  @Input()
  public reviewCount: number = 0;

  public get rating(): number {
    return this._rating;
  }

  constructor(
    private arrayConverterService: ArrayConvertService,
    private cdr: ChangeDetectorRef,
    private previewService: IsPreviewService,
  ) {
    this.ratingNumbers = Array(this.maxRatingNumber)
      .fill(0)
      .map((_: number, i: number) => i + 1);
    this.preview = this.previewService.isPreview();
  }

  public toggleDescription(): void {
    this.isDescriptionToggled = !this.isDescriptionToggled;
  }

  public ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  public ngOnChanges(): void {
    if (this.course?.requirements) {
      this.courseRequirements = this.arrayConverterService.convertToArray(
        this.course?.requirements,
      );
    }
    if (this.course?.will_learn) {
      this.courseWill_learn = this.arrayConverterService.convertToArray(this.course?.will_learn);
    }
  }
}
