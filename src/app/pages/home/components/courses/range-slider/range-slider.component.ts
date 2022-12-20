import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangeContext, Options } from '@angular-slider/ngx-slider';
import { FilterItem } from '../../../../../shared/interfaces/courses/course-global-filter.interface';
@Component({
  selector: 'us-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent {
  @Input()
  public label: string = '';

  @Input()
  public isExpanded: boolean = true;

  @Output()
  public selectFilter: EventEmitter<FilterItem> = new EventEmitter<FilterItem>();

  public minValue: number = 5000;

  public maxValue: number = 100000;

  public options: Options = { floor: 5000, ceil: 100000 };

  public onUserChangeEnd(event: ChangeContext) {
    this.selectFilter.emit({ ids: [event.value, event.highValue!], label: this.label });
  }

  public expandCollapse() {
    this.isExpanded = !this.isExpanded;
  }
}
