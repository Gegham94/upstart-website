import { Component, OnInit } from '@angular/core';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
import { Currency } from 'src/app/shared/enums/currency';
import { PublicCourse } from 'src/app/shared/interfaces/courses/public-course.interface';
@Component({
  selector: 'us-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss', './favorites.component.media.scss'],
})
export class FavoritesComponent implements OnInit {
  public readonly buttonTheme = ButtonTheme;

  public favorites: PublicCourse[];

  public errorMessage: string = '';

  public showLoader: boolean = false;

  public showEmptyMessage: boolean = false;

  constructor(private readonly favorite: FavoritesService) {}

  public ngOnInit() {
    this.getFavorites();
  }

  private getFavorites(): void {
    this.favorite.getFavorites().subscribe((res) => {
      if (!res.data) this.showEmptyMessage = true;
      this.favorites = res.data;
      this.showLoader = false;
    });
  }

  public removedFromWishList(): void {
    this.getFavorites();
  }

  public get currencyType(): typeof Currency {
    return Currency;
  }
}
