import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Students } from '../../../../../shared/interfaces/students/students.interface';
import { StudentsService } from '../../../../../shared/services/students/students.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatedTitleService } from '../../../../../shared/services/translated-title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'us-dashboard-students',
  templateUrl: './dashboard-students.component.html',
  styleUrls: ['./dashboard-students.component.scss'],
})
export class DashboardStudentsComponent implements OnInit, OnDestroy {
  public title: string = 'dashboard.sidebar.students';

  public students$: Subject<boolean> = new Subject<boolean>();

  public studentsList: Students[] = [];

  public loader: boolean = false;

  constructor(
    private router: Router,
    private studentsService: StudentsService,
    private toastrService: ToastrService,
    private readonly translatedTitleService: TranslatedTitleService,
  ) {
    this.translatedTitleService.setTranslatedTitle(this.title);
  }

  public ngOnInit(): void {
    this.fetchDataList();
  }

  public fetchDataList() {
    this.loader = true;
    this.studentsService
      .getStudentsList()
      .pipe(takeUntil(this.students$))
      .subscribe((res) => {
        if (res.success) {
          this.studentsList = res.data;
        } else {
          this.toastrService.error(res.message);
        }
        this.loader = false;
      });
  }

  public ngOnDestroy(): void {
    this.students$.next(true);
    this.students$.complete();
  }

  public openCourseList(student: Students) {
    this.router.navigate([`/dashboard/students/${student.user_id}/courses`]);
  }
}
