import { Component, Input } from '@angular/core';

@Component({
  selector: 'us-header-mobile-action-panel',
  templateUrl: './header-mobile-action-panel.component.html',
  styleUrls: ['./header-mobile-action-panel.component.scss'],
})
export class HeaderMobileActionPanelComponent {
  @Input()
  public isLoggedIn: boolean = false;
}
