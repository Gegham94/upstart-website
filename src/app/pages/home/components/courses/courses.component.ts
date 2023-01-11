import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TranslatedTitleService } from '../../../../shared/services/translated-title.service';
import { TranslateService } from '@ngx-translate/core';
import { PublicCourse } from '../../../../shared/interfaces/courses/public-course.interface';
import { FilterCoursesService } from 'src/app/shared/services/filter-courses.service';
import {
  CourseGlobalFilter,
  FilterItem,
} from '../../../../shared/interfaces/courses/course-global-filter.interface';
import { HttpParams } from '@angular/common/http';
import { PaginatePipeArgs } from 'ngx-pagination/lib/paginate.pipe';
import { SelectOptions } from '../../../../shared/interfaces/select-options.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'us-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss', './courses.component.media.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private readonly title: string = 'courses.title';

  private readonly mobileMaxWidth: number = 600;

  public isMobile: boolean = false;

  public lang: string = '';

  public isLoading: boolean = true;

  public coursesData: PublicCourse[];

  public isColapsed: boolean = false;

  public labeles: string[] = ['Topic', 'Level', 'Type', 'Language'];

  public selectedCategoryIds: string[] = [];

  public searchText: string;

  public totalPages: number = 0;

  public pageSize: number = 0;

  public currentPage: number = 1;

  public config: PaginatePipeArgs;

  public sort: unknown;

  public unsubscribe: Subject<void> = new Subject<void>();

  public sortOptions: { displayName: string; value: string }[] = [];

  public filterValues: CourseGlobalFilter = {
    categories: {
      label: 'Topic',
      ids: [],
    },
    level: {
      label: 'Level',
      ids: [],
    },
    type: {
      label: 'Type',
      ids: [],
    },
    language_id: {
      label: 'Language',
      ids: [],
    },
    price: {
      label: 'Price',
      ids: [],
    },
  };

  private fetchTimeOut: NodeJS.Timeout;

  @HostListener('window:resize', ['$event'])
  public resizeHandler(event: Event) {
    this.isMobile = (event.target as Window).innerWidth <= this.mobileMaxWidth;
    if (this.isMobile) {
      this.isColapsed = true;
    } else {
      this.isColapsed = false;
    }
  }

  constructor(
    private readonly translateService: TranslateService,
    private readonly translatedTitleService: TranslatedTitleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly filterCoursesService: FilterCoursesService,
    private router: Router,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
    this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe)).subscribe((params) => {
      if (Object.keys(params).length > 0) {
        this.currentPage = params['p'];
        this.sort = params['sort'];
        this.searchText = params['search_text'];
        this.selectedCategoryIds =
          typeof params['categories'] === 'string' ? params['categories'].split(',') : [];
      }
      this.fetchData();
    });
  }

  public ngOnInit(): void {
    this.translateService.get('home.courses.newest').subscribe((res: string) => {
      this.sortOptions.push({ displayName: res, value: 'newest' });
    });
    this.translateService.get('home.courses.highest').subscribe((res: string) => {
      this.sortOptions.push({ displayName: res, value: 'highest-rated' });
    });

    if (this.mobileMaxWidth > window.innerWidth) {
      this.isColapsed = true;
      this.isMobile = true;
    } else {
      this.isColapsed = false;
    }
  }

  public ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public toggleFilter() {
    this.isColapsed = !this.isColapsed;
  }

  public languageChanged(event: Event): void {
    const language = (event.target as HTMLSelectElement).value;
    this.translateService.use(language);
  }

  public selectFilter(data: FilterItem): void {
    let filterKey: keyof CourseGlobalFilter = 'categories';
    Object.entries(this.filterValues).forEach(([key, value]) => {
      if (value.label === data.label) {
        filterKey = key as keyof CourseGlobalFilter;
      }
    });

    if (this.filterValues[filterKey]?.ids?.length === 0) {
      if (data.ids?.length === 0) {
        return;
      } else {
        this.filterValues[filterKey].ids = data.ids;
      }
    } else {
      this.filterValues[filterKey].ids = data.ids;
    }

    let params = new HttpParams();
    Object.entries(this.filterValues).forEach(([key, value]) => {
      if (key === 'price' && value.ids && value.ids.length > 0) {
        if (this.filterValues.price.ids?.[0] !== undefined)
          params = params.append('price_from', this.filterValues.price.ids[0]);
        else params = params.delete(key);

        if (this.filterValues.price.ids?.[1] !== undefined)
          params = params.append('price_to', this.filterValues.price.ids[1]);
        else params = params.delete(key);
      } else if (value.ids?.length) {
        params = params.append(key, value.ids.join(','));
      } else {
        params = params.delete(key, value.ids);
      }
    });
    let paramObj = {};
    Object.entries(params).forEach(([key, value]) => {
      if (key !== 'updates') {
        return;
      } else if (value) {
        value.forEach((item: { param: string; value: string; op: string }) => {
          let mergedObj = {
            [item.param]: item.value,
          };
          paramObj = Object.assign(paramObj, mergedObj);
        });
      }
    });

    this.currentPage = 1;
    this.isLoading = true;
    this.addCurrentPageParam(paramObj);
  }

  public fetchData() {
    this.isLoading = true;

    if (this.coursesData) {
      this.coursesData = [];
    }

    clearTimeout(this.fetchTimeOut);

    this.fetchTimeOut = setTimeout(() => {
      this.filterCoursesService
        .getFilteredCoursesData(
          {
            ...this.filterValues,
            categories: {
              ...this.filterValues.categories,
              ids: Array.from(
                new Set([
                  ...this.selectedCategoryIds.map(Number),
                  ...(!!this.filterValues.categories.ids ? this.filterValues.categories.ids : []),
                ]),
              ),
            },
          },
          this.currentPage,
          this.searchText,
          this.sort as string,
        )
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res) => {
          this.coursesData = res.data;
          this.currentPage = res.current_page!;
          this.pageSize = res.per_page!;
          this.totalPages = res.total_count!;
          this.isLoading = false;
          this.setPaginationConfig(this.pageSize, this.currentPage, this.totalPages);
        });
    }, 200);
  }

  public setPaginationConfig(pageSize: number, currentPage: number, totalPages: number) {
    this.config = {
      itemsPerPage: pageSize,
      currentPage: currentPage,
      totalItems: totalPages,
    };
  }

  public pageChanged(event: number): void {
    this.currentPage = event;
    this.addCurrentPageParam();
  }

  public addCurrentPageParam(params?: {}) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...params,
        p: this.currentPage,
        sort: this.sort,
      },
      queryParamsHandling: 'merge',
    });
  }

  public sortBy(ev: SelectOptions) {
    this.sort = ev.value;
    this.addCurrentPageParam();
  }
}
