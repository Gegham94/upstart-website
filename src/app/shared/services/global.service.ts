import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUserInfoInterface } from '../interfaces/current-user.interface';
import { CategoriesInterface } from '../interfaces/categories/categories.interface';
import { FilterToggleItemsInterface } from '../interfaces/filter-toggle-items.interface';
import { PublicCourse } from '../interfaces/courses/public-course.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private readonly currentUser$: BehaviorSubject<CurrentUserInfoInterface | null> =
    new BehaviorSubject<CurrentUserInfoInterface | null>(null);

  private readonly categoriesList$: BehaviorSubject<CategoriesInterface[]> = new BehaviorSubject<
    CategoriesInterface[]
  >([]);

  private readonly typesList$: BehaviorSubject<FilterToggleItemsInterface[]> = new BehaviorSubject<
    FilterToggleItemsInterface[]
  >([]);

  private readonly levelsList$: BehaviorSubject<{ [key: string]: number }> = new BehaviorSubject<{
    [key: string]: number;
  }>({});

  private readonly languagesList$: BehaviorSubject<FilterToggleItemsInterface[]> =
    new BehaviorSubject<FilterToggleItemsInterface[]>([]);

  private readonly coursesByLangList$: BehaviorSubject<PublicCourse[] | null> = new BehaviorSubject<
    PublicCourse[] | null
  >(null);

  // Current User
  public set currentUser(user: CurrentUserInfoInterface | null) {
    this.currentUser$.next(user);
  }

  public get currentUserObservable(): Observable<CurrentUserInfoInterface | null> {
    return this.currentUser$.asObservable();
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUser$.value;
  }

  // Categories List
  public set categoriesList(list: CategoriesInterface[]) {
    this.categoriesList$.next(list);
  }

  public get categoriesListObservable(): Observable<CategoriesInterface[]> {
    return this.categoriesList$.asObservable();
  }

  // Types List
  public set typesList(list: FilterToggleItemsInterface[]) {
    this.typesList$.next(list);
  }

  public get typesListObservable(): Observable<FilterToggleItemsInterface[]> {
    return this.typesList$.asObservable();
  }

  // Levels List
  public set levelsList(list: { [key: string]: number }) {
    this.levelsList$.next(list);
  }

  public get levelsListObservable(): Observable<{ [key: string]: number }> {
    return this.levelsList$.asObservable();
  }

  // Languages List
  public set languagesList(list: FilterToggleItemsInterface[]) {
    this.languagesList$.next(list);
  }

  public get languagesListObservable(): Observable<FilterToggleItemsInterface[]> {
    return this.languagesList$.asObservable();
  }

  // Courses List
  public set coursesByLangList(list: PublicCourse[]) {
    this.coursesByLangList$.next(list);
  }

  public get getCoursesByLangList(): Observable<PublicCourse[] | null> {
    return this.coursesByLangList$.asObservable();
  }
}
