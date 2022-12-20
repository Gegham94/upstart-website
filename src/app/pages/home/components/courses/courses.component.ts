import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'us-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss', './courses.component.media.scss'],
})
export class CoursesComponent implements OnInit {
  private readonly title: string = 'courses.title';

  public lang: string = '';

  public isLoading: boolean = true;

  public coursesData: PublicCourse[];

  public isColapsed: boolean = false;

  public labeles: string[] = ['Topic', 'Level', 'Type', 'Language'];

  public selectedCategoryId: string;

  public searchText: string;

  public totalPages: number = 0;

  public pageSize: number = 0;

  public currentPage: number = 1;

  public config: PaginatePipeArgs;

  public sort: unknown;

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

  constructor(
    private readonly translateService: TranslateService,
    private readonly translatedTitleService: TranslatedTitleService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly filterCoursesService: FilterCoursesService,
    private router: Router,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
    this.activatedRoute.params.subscribe((params) => {
      this.selectedCategoryId = params['id'];
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentPage = params['p'];
      this.sort = params['sort'];
      this.searchText = params['search_text'];
    });
  }

  public ngOnInit(): void {
    this.translateService.get('home.courses.newest').subscribe((res: string) => {
      this.sortOptions.push({ displayName: res, value: 'newest' });
    });
    this.translateService.get('home.courses.highest').subscribe((res: string) => {
      this.sortOptions.push({ displayName: res, value: 'highest-rated' });
    });
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

    if (this.filterValues[filterKey]?.ids.length === 0) {
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
      if (key === 'price' && value.ids.length > 0) {
        params = params.append('price_from', this.filterValues.price.ids[0]);
        params = params.append('price_to', this.filterValues.price.ids[1]);
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

    this.fetchData();
  }

  public fetchData() {
    this.isLoading = true;
    if (this.coursesData) {
      this.coursesData = [];
    }
    this.filterCoursesService
      .getFilteredCoursesData(
        this.filterValues,
        this.currentPage,
        this.searchText,
        this.sort as string,
      )
      .subscribe((res) => {
        this.coursesData = res.data;
        this.currentPage = res.current_page!;
        this.pageSize = res.per_page!;
        this.totalPages = res.total_count!;
        this.isLoading = false;
        this.setPaginationConfig(this.pageSize, this.currentPage, this.totalPages);
      });
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
    this.fetchData();
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
    this.fetchData();
    this.addCurrentPageParam();
  }
}
