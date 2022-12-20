import { Component, Input } from '@angular/core';

@Component({
  selector: 'us-tooltip',
  template: `<p>{{ text }}</p>`,
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input()
  public text: string = '';
}
