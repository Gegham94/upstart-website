import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType } from '../../../enums/button-type.enum';
import { ButtonTheme } from '../../../enums/button-theme.enum';

@Component({
  selector: 'us-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  public type: ButtonType = ButtonType.button;

  @Input()
  public outline: boolean = false;

  @Input()
  public disabled: boolean = false;

  @Input()
  public circle: boolean = false;

  @Input()
  public autoSetSuffix: string = '';

  @Input()
  public icon: string = '';

  @Input()
  public iconSize: number = 24;

  @Input()
  public loader: boolean = false;

  @Input()
  public theme: ButtonTheme = ButtonTheme.transparent;

  @Output()
  public clicked: EventEmitter<void> = new EventEmitter<void>();

  public isHovered: boolean = false;

  public setHoverState(newState: boolean): void {
    this.isHovered = newState;
  }
}
