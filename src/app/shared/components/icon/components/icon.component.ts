import { Component, Input } from '@angular/core';

@Component({
  selector: 'us-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input()
  public name!: string;

  @Input()
  public size?: number = 24;
}
