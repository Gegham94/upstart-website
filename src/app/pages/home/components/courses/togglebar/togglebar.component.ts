import { GlobalService } from './../../../../../shared/services/global.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { ToggleItem } from '../../../../../shared/interfaces/toggle-item.interface';
import { CategoriesInterface } from '../../../../../shared/interfaces/categories/categories.interface';
import { FilterItem } from '../../../../../shared/interfaces/courses/course-global-filter.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'us-togglebar',
  templateUrl: './togglebar.component.html',
  styleUrls: ['./togglebar.component.scss'],
})
export class TogglebarComponent implements OnInit, AfterViewInit {
  @Input()
  public label: string = '';

  public searchText: string = '';

  @ViewChild('labelText') public labelTr: ElementRef;

  public isExpanded: boolean = true;

  public items: TreeviewItem[] = [];

  public topic: ToggleItem[] = [];

  public level: ToggleItem[] = [];

  public type: ToggleItem[] = [];

  public language: ToggleItem[] = [];

  @Input()
  public selectedCategoryId: string[];

  @Output()
  public selectFilter: EventEmitter<FilterItem> = new EventEmitter<FilterItem>();

  public readonly config: TreeviewConfig = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 600,
    hasDivider: true,
  };

  constructor(
    private readonly globalService: GlobalService,
    private readonly translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.searchText !== params['search_text']) {
        this.searchText = params['search_text'];
        this.getData();
      }
    });
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      const label = this.labelTr.nativeElement as HTMLElement;
      switch (label.innerText.toLowerCase()) {
        case 'topic':
          label.innerText = this.translateService.instant('home.courses.topic');
          break;
        case 'level':
          label.innerText = this.translateService.instant('home.courses.level');
          break;
        case 'type':
          label.innerText = this.translateService.instant('home.courses.type');
          break;
        case 'language':
          label.innerText = this.translateService.instant('home.courses.language');
          break;
      }
    }, 500);
  }

  public getData() {
    switch (this.label) {
      case 'Topic':
        this.globalService.categoriesListObservable.subscribe((res) => {
          if (res.length <= 0) return;

          this.topic = this.parseCategoriesChildren(res, this.selectedCategoryId);
          this.items = this.getItems(this.topic);
        });
        this.isExpanded = false;
        break;
      case 'Level':
        this.globalService.levelsListObservable.subscribe((res) => {
          this.level = [];
          Object.entries(res).forEach(([key, value]) => {
            if (Number(value) !== 1) {
              this.level.push({
                checked: false,
                text: key,
                value: Number(value),
              });
            }
          });
          this.isExpanded = true;
          this.items = this.getItems(this.level);
        });
        break;
      case 'Type':
        this.globalService.typesListObservable.subscribe((res) => {
          this.type = [];
          Object.entries(res).forEach(([key, value]) => {
            this.type.push({
              checked: false,
              text: key,
              value: Number(value),
            });
          });
          this.isExpanded = true;
          this.items = this.getItems(this.type);
        });
        break;
      case 'Language':
        this.globalService.languagesListObservable.subscribe((res) => {
          this.language = [];
          res.forEach((element) => {
            this.language.push({
              checked: false,
              text: element.title,
              value: element.id,
            });
          });
          this.isExpanded = true;
          this.items = this.getItems(this.language);
        });
        break;
    }
  }

  public parseCategoriesChildren(children: CategoriesInterface[], selectedCategoryId?: string[]) {
    let itemsArray: ToggleItem[] = [];
    children.forEach((element: CategoriesInterface) => {
      if (!element.children || element.children.length === 0) {
        if (selectedCategoryId?.includes(element.id.toString())) {
          itemsArray.push({
            checked: true,
            text: element.title,
            value: element.id,
          });
        } else if (selectedCategoryId?.includes(element.parent_id?.toString())) {
          itemsArray.push({
            checked: true,
            text: element.title,
            value: element.id,
          });
        } else {
          itemsArray.push({
            checked: false,
            text: element.title,
            value: element.id,
          });
        }
      } else if (selectedCategoryId?.includes(element.id.toString())) {
        itemsArray.push({
          checked: true,
          text: element.title,
          value: element.id,
          children: this.parseCategoriesChildren(element.children, selectedCategoryId),
        });
      } else {
        let prop: boolean = false;
        element.children.forEach((item) => {
          if (selectedCategoryId?.includes(item.id.toString())) {
            prop = true;
          }
        });
        if (prop) {
          itemsArray.push({
            checked: true,
            text: element.title,
            collapsed: false,
            value: element.id,
            children: this.parseCategoriesChildren(element.children, selectedCategoryId),
          });
        } else {
          itemsArray.push({
            checked: false,
            text: element.title,
            collapsed: true,
            value: element.id,
            children: this.parseCategoriesChildren(element.children, selectedCategoryId),
          });
        }
      }
    });
    return itemsArray;
  }

  public getItems(parentChildObj: ToggleItem[]) {
    let itemsArray: TreeviewItem[] = [];
    parentChildObj.forEach((set: ToggleItem) => {
      itemsArray.push(new TreeviewItem(set));
    });
    return itemsArray;
  }

  public selectedValue(ids: number[]) {
    if (this.label === 'Topic') {
      const foundedParent = this.topic.filter(
        (el) =>
          el.children && el.children.filter((child) => !ids.includes(child.value)).length === 0,
      );

      ids.push(...foundedParent.map((parent) => parent.value));
    }

    this.selectFilter.emit({ ids, label: this.label });
  }

  public expandCollapse() {
    this.isExpanded = !this.isExpanded;
  }
}
