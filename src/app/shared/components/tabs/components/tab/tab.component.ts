import { Component, HostBinding, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'us-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnChanges {
  @Input()
  public title!: string;

  @Input()
  public completed: boolean = false;

  @Input()
  public invalid: boolean = false;

  @Input()
  public active: boolean = false;

  @HostBinding('class.active')
  public activeClass: boolean = false;

  public ngOnChanges(): void {
    this.activeClass = this.active;
  }
}
