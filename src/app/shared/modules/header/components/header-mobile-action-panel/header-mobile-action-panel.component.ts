import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'us-header-mobile-action-panel',
  templateUrl: './header-mobile-action-panel.component.html',
  styleUrls: ['./header-mobile-action-panel.component.scss'],
})
export class HeaderMobileActionPanelComponent {
  @Input()
  public isLoggedIn: boolean = false;

  @Output()
  public showSearchMenu: EventEmitter<void> = new EventEmitter();

  public showSearch() {
    this.showSearchMenu.emit();
  }
}
