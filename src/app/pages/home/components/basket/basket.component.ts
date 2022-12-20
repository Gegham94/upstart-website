import { OnInit, Component } from '@angular/core';
import { TranslatedTitleService } from '../../../../shared/services/translated-title.service';
import { TranslateService } from '@ngx-translate/core';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { TrainerCourse } from 'src/app/shared/interfaces/courses/trainer-course';
import { Currency } from 'src/app/shared/enums/currency';

@Component({
  selector: 'us-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss', './basket.component.media.scss'],
})
export class BasketComponent implements OnInit {
  private readonly title: string = 'basket.title';

  public coursesData?: TrainerCourse[];

  public readonly buttonTheme = ButtonTheme;

  public loader: boolean = true;

  public update: boolean = false;

  public emptyBasket: boolean = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly translatedTitleService: TranslatedTitleService,
    private basketService: BasketService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.getBasketCourses();
  }

  public languageChanged(event: Event): void {
    const language = (event.target as HTMLSelectElement).value;
    this.translateService.use(language);
  }

  public get totalPrice(): number {
    let total = 0;
    if (this.coursesData)
      this.coursesData.forEach((elem) => {
        total += Number(elem.price);
      });
    return total;
  }

  public removedCourse() {
    this.update = true;
    this.getBasketCourses();
  }

  public basketEvent(): void {
    this.getBasketCourses();
  }

  public getBasketCourses(): void {
    this.basketService
      .getProducts()
      .pipe()
      .subscribe((res) => {
        this.coursesData = res.data;
        this.loader = false;
        this.update = false;
        if (!this.coursesData) {
          this.emptyBasket = true;
        } else {
          this.emptyBasket = false;
        }
      });
  }

  public get getCurrency(): typeof Currency {
    return Currency;
  }
}
