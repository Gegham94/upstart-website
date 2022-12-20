import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxStarsComponent } from 'ngx-stars';

@Component({
  selector: 'us-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements AfterViewInit {
  @ViewChild(NgxStarsComponent)
  public starsComponent!: NgxStarsComponent;

  @Input()
  public color: string = '';

  @Input()
  public maxStars: number = 0;

  @Input()
  public size: number = 0;

  @Input()
  public rateValue: number = 0;

  @Input()
  public isReadOnly: boolean = false;

  @Output()
  public ratingStarsOutput: EventEmitter<number> = new EventEmitter<number>();

  constructor(private cdref: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    const starSize = String(this.size);
    if (this.starsComponent) {
      this.starsComponent.setRating(this.rateValue);
      this.starsComponent.customSize = starSize + 'px';
    }
    this.cdref.detectChanges();
  }

  public onRatingSet(event: number) {
    this.ratingStarsOutput.emit(event);
  }
}
