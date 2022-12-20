import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { SearchAutocompleteService } from '../../../../../shared/services/serach-autocomplete.service';
import { TranslateService } from '@ngx-translate/core';
import { SearchResponseInterface } from '../../../../interfaces/search-response.interface';
import { Cources } from '../../../../interfaces/courses.interface';
import { NavigationStart, Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
@Component({
  selector: 'us-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss', './header-search.component.media.scss'],
})
export class HeaderSearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatAutocompleteTrigger)
  public auto: MatAutocompleteTrigger;

  public searchValuesForm = new FormControl();

  public filteredText: Array<string>;

  public publicCourse: Array<Cources>;

  public isLoading = false;

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public errorMsg!: string;

  private minLengthTerm = 3;

  public isParams: boolean = false;

  public selectedValue: string = '';

  constructor(
    private readonly searchAutocompleteService: SearchAutocompleteService,
    private readonly translateService: TranslateService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!event.url.includes('search_text')) {
          this.selectedValue = '';
          this.filteredText = [];
          this.publicCourse = [];
          this.errorMsg = '';
          this.searchValuesForm.reset();
        } else {
          this.isParams = true;
        }
      }
    });
    this.searchValuesForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((str) => {
          this.selectedValue = str;
          this.filteredText = [];
          this.publicCourse = [];
          return str && str.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(300),
        tap(() => {
          this.errorMsg = '';
          this.filteredText = [];
          this.publicCourse = [];

          this.isLoading = true;
        }),
        switchMap((text) =>
          this.searchAutocompleteService.getAutocompleteData(text).pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          ),
        ),
      )
      .subscribe((data: SearchResponseInterface) => {
        if (!data.success) {
          this.errorMsg = this.translateService.instant('global.header.not-found');
          this.filteredText = [];
          this.publicCourse = [];
        } else {
          this.errorMsg = '';
          this.filteredText = data.text;
          // data.courses.forEach((el) => {
          //   this.filteredText.push(el);
          // });
          this.publicCourse = data.courses;
          if (!data.text.length) {
            this.filteredText = [];
            this.publicCourse = [];
          }
        }
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public onSelected() {
    // this.searchAutocompleteService.getSearchData(this.selectedValue).subscribe((data) => {
    //   // THIS IS TEMPORARY LINE TO GETING SERCHED DATA
    //   console.log('This is clicked item data: ', data);
    // });
  }

  public clearSelection() {
    this.selectedValue = '';
    this.filteredText = [];
    this.publicCourse = [];
    this.errorMsg = '';
    this.searchValuesForm.reset();
  }

  public redirectToSearch(text: string) {
    this.auto.closePanel();
    this.router.navigate(['/courses'], { queryParams: { search_text: text } });
  }

  public removeParam() {
    if (this.isParams) {
      this.router.navigate(['/courses']);
    }
  }
}
