import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { CategoriesInterface } from '../../../../shared/interfaces/categories/categories.interface';
import { GlobalService } from '../../../../shared/services/global.service';

@Component({
  selector: 'us-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss', './home-categories.component.media.scss'],
})
export class HomeCategoriesComponent implements OnInit, OnDestroy {
  public categories?: CategoriesInterface[];

  private categoriesSubscription?: Subscription;

  private readonly destroyed$: Subject<void> = new Subject<void>();

  constructor(private readonly globalService: GlobalService, private router: Router) {}

  public ngOnInit() {
    this.fetchCategories();
  }

  public fetchCategories(): void {
    this.categoriesSubscription = this.globalService.categoriesListObservable.subscribe((res) => {
      this.categories = res;
    });
  }

  public navigate(event: CategoriesInterface) {
    this.router.navigate([`/courses`], {
      queryParams: {
        categories: event.id,
      },
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
