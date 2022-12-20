import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { Observable } from 'rxjs';
import { CategoriesInterface } from '../../../../interfaces/categories/categories.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'us-header-categories',
  templateUrl: './header-categories.component.html',
  styleUrls: ['./header-categories.component.scss'],
})
export class HeaderCategoriesComponent implements OnInit {
  public categoriesSubscription$?: Observable<CategoriesInterface[]>;

  public hideCategoryList: boolean;

  constructor(private globalService: GlobalService, private router: Router) {}

  public ngOnInit(): void {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url.includes('/courses') || ev.url === '/') {
          this.hideCategoryList = false;
        } else {
          this.hideCategoryList = true;
        }
      }
    });
    this.categoriesSubscription$ = this.globalService.categoriesListObservable;
  }

  public navigate(event: CategoriesInterface) {
    this.router.navigate([`/courses/${event.id}`]);
  }
}
