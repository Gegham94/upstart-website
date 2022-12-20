import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOptions } from '../../../../interfaces/select-options.interface';

@Component({
  selector: 'us-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss'],
})
export class OptionListComponent {
  @Input()
  public option!: SelectOptions;

  @Input()
  public selected: boolean = false;

  @Output()
  public optionSelected: EventEmitter<SelectOptions> = new EventEmitter<SelectOptions>();

  public isOpened: boolean = false;
}
