import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CourseCountService {
  public coursesInBasket$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public coursesInWishList$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
}
