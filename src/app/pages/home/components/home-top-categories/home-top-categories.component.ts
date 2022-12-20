import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../shared/services/global.service';
import { CategoriesInterface } from '../../../../shared/interfaces/categories/categories.interface';

@Component({
  selector: 'us-home-top-categories',
  templateUrl: './home-top-categories.component.html',
  styleUrls: ['./home-top-categories.component.scss', './home-top-categories.component.media.scss'],
})
export class HomeTopCategoriesComponent implements OnInit {
  public categories: (CategoriesInterface | undefined)[] = [];

  constructor(private globalService: GlobalService) {}

  public ngOnInit(): void {
    this.globalService.categoriesListObservable.subscribe((categories) => {
      this.categories = categories;
    });
  }
}
