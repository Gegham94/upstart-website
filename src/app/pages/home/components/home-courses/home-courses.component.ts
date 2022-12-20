import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonTheme } from 'src/app/shared/enums/button-theme.enum';
import { PublicCourse } from 'src/app/shared/interfaces/courses/public-course.interface';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'us-home-courses',
  templateUrl: './home-courses.component.html',
  styleUrls: ['./home-courses.component.scss', './home-courses.component.media.scss'],
})
export class HomeCoursesComponent implements OnInit, OnDestroy {
  public readonly buttonTheme = ButtonTheme;

  public courses: PublicCourse[];

  public unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public loader: boolean = true;

  constructor(private globalService: GlobalService, private router: Router) {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public ngOnInit(): void {
    this.globalService.getCoursesByLangList.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.loader = false;
      this.courses = res;
    });
  }

  public goCategories() {
    this.router.navigate(['courses']);
  }
}
