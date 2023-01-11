import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'us-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent {
  public isShowIcon: boolean;

  public startShowingIcon: number = 400;

  @HostListener('window:scroll')
  public checkScroll() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.startShowingIcon) {
      this.isShowIcon = true;
    } else {
      this.isShowIcon = false;
    }
  }

  public gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
