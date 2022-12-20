import { Component, Inject, OnInit, Optional } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslatedTitleService } from '../shared/services/translated-title.service';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { Router } from '@angular/router';
import { RouterDataService } from '../shared/services/router-data.service';
import { Data, NavigationEnd } from '@angular/router';
import { CurrentUserInfoService } from '../shared/services/current-user-info/current-user-info.service';
import { GlobalService } from '../shared/services/global.service';
import { AuthorizationService } from '../shared/services/auth/authorization.service';
import { CategoriesService } from '../shared/services/categories/categories.service';
import { LevelsService } from '../shared/services/levels/levels.service';
import { TypesService } from '../shared/services/types/types.service';
import { LanguagesService } from '../shared/services/languages/languages.service';
import { LoadingService } from '../shared/services/loading.service';
import { CourseCountService } from '../shared/services/course-count/course-count.service';
import { CoursesApiService } from '../shared/services/courses/courses-api.service';

@Component({
  selector: 'us-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isDashboard: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly routerDataService: RouterDataService,
    private readonly translateService: TranslateService,
    private readonly translatedTitleService: TranslatedTitleService,
    private readonly currentUserInfoService: CurrentUserInfoService,
    private readonly globalService: GlobalService,
    private readonly authService: AuthorizationService,
    private readonly loadingService: LoadingService,
    private readonly categoriesService: CategoriesService,
    private readonly levelsService: LevelsService,
    private readonly typesService: TypesService,
    private readonly languagesService: LanguagesService,
    private readonly courseCountService: CourseCountService,
    private readonly courseService: CoursesApiService,
    @Optional()
    @Inject(REQUEST)
    private readonly request: Request,
    @Inject('PLATFORM_ID') private readonly platformId: string,
  ) {
    const noScrollRoutes: string[] = ['/courses', '/courses/'];
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (
          this.router.url.includes(noScrollRoutes[0]) ||
          this.router.url.includes(noScrollRoutes[1])
        ) {
          return;
        } else {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    });
  }

  public ngOnInit(): void {
    let defaultLanguage: string = this.getLang();

    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translatedTitleService.updateTitle();

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('lang', event.lang);
      }
    });

    this.routerDataService.getRoutesData().subscribe((data: Data) => {
      this.isDashboard = data['dashboard'] ?? false;
    });

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', defaultLanguage);
    }

    this.loadingService.show();

    this.authService.authToken.subscribe((token) => {
      if (token) {
        this.currentUserInfoService.getUserInfo().subscribe((userInfo) => {
          this.globalService.currentUser = userInfo.data;
          this.courseCountService.coursesInBasket$.next(userInfo.data.basket_list_count);
          this.courseCountService.coursesInWishList$.next(userInfo.data.wish_list_count);
        });
      }
    });

    this.categoriesService.getCategories().subscribe(() => {
      this.loadingService.hide();
    });

    this.levelsService.getLevels().subscribe(() => {
      this.loadingService.hide();
    });

    this.typesService.getTypes().subscribe(() => {
      this.loadingService.hide();
    });

    this.languagesService.getLanguages().subscribe(() => {
      this.loadingService.hide();
    });

    this.courseService.getCoursesByLang().subscribe(() => {
      this.loadingService.hide();
    });
  }

  public getLang(): string {
    let lang: string = '';

    if (isPlatformBrowser(this.platformId)) {
      const storedLanguage = localStorage.getItem('lang');

      if (storedLanguage && ['en', 'hy'].indexOf(storedLanguage) > -1) {
        lang = storedLanguage;
      } else if (['en', 'hy'].indexOf(<string>this.translateService.getBrowserLang()) > -1) {
        lang = <string>this.translateService.getBrowserLang();
      } else {
        lang = 'en';
        localStorage.setItem('lang', lang);
      }
    } else {
      lang = (this.request.headers['accept-language'] || 'en').substring(0, 2);
    }

    return lang;
  }
}
