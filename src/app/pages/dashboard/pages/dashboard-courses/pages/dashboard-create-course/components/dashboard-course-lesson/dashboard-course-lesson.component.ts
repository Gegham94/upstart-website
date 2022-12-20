import { Component, Input, OnChanges, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ResourceType } from '../../enums/resource-type.enum';
import { ButtonTheme } from '../../../../../../../../shared/enums/button-theme.enum';
import { LessonsApiService } from '../../../../../../../../shared/services/lessons-api.service';
import { CourseType } from '../../../../../../../../shared/enums/course-type.enum';
import { ToastrService } from 'ngx-toastr';
import { Lesson } from '../../../../../../../../shared/interfaces/lesson.interface';
import { SectionElementType } from '../../enums/section-element-type.enum';
import { CourseFormService } from '../../services/course-form.service';
import { ApiResponse } from '../../../../../../../../shared/interfaces/api/api-response.interface';
import { SelectOptions } from '../../../../../../../../shared/interfaces/select-options.interface';
import { Router } from '@angular/router';
import { AccordionComponent } from '../../../../../../../../shared/components/accordion/components/accordion.component';

@Component({
  selector: 'us-dashboard-course-lesson',
  templateUrl: './dashboard-course-lesson.component.html',
  styleUrls: ['./dashboard-course-lesson.component.scss'],
})
export class DashboardCourseLessonComponent implements OnChanges, OnInit {
  public readonly resourceType = ResourceType;

  public readonly buttonTheme = ButtonTheme;

  public editMode: boolean = true;

  @Input()
  public type!: CourseType;

  @Input()
  public courseId!: number;

  @Input()
  public lessonForm!: FormGroup;

  @Input()
  public index!: number;

  @Input()
  public sectionId!: number;

  @Input()
  public collapsed: boolean = false;

  @Input()
  public resourceOptions!: SelectOptions[];

  @ViewChildren(AccordionComponent)
  public accordionQueryList!: QueryList<AccordionComponent>;

  constructor(
    private readonly courseFormService: CourseFormService,
    private readonly lessonsApiService: LessonsApiService,
    private readonly toastrService: ToastrService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.lessonForm.get('resources')?.valueChanges.subscribe((newValue) => {
      if (newValue.includes(-1)) {
        this.router.navigate(['dashboard', 'resources']);
      }
    });
  }

  public ngOnChanges(): void {
    this.setElementResourceType(this.lessonForm.get('resource')?.value);
  }

  public setElementResourceType(resourceType: ResourceType): void {
    switch (resourceType) {
      case ResourceType.VIDEO:
        this.lessonForm.addControl('videoLink', new FormControl(''));
        break;
      case ResourceType.ARTICLE:
        this.lessonForm.addControl('article', new FormControl(''));
        break;
    }
    this.lessonForm.get('resource')?.setValue(resourceType);
    this.lessonForm.updateValueAndValidity();
  }

  public addDescriptionField(): void {
    this.lessonForm.addControl('description', new FormControl(''));
  }

  public addResourcesField(): void {
    this.lessonForm.addControl('resources', new FormControl([]));
    this.lessonForm.get('resources')?.valueChanges.subscribe((newValue) => {
      if (newValue.includes(-1)) {
        this.router.navigate(['dashboard', 'resources']);
      }
    });
  }

  public setEditMode(newState: boolean): void {
    this.editMode = newState;
  }

  public saveLesson(): void {
    this.lessonsApiService
      .updateLesson({
        id: this.lessonForm.value.id,
        title: this.lessonForm.value.title,
        type: this.lessonForm.value.resource,
        course_id: this.courseId,
        article: this.lessonForm.value.article,
        video_url: this.lessonForm.value.videoLink,
        resources: this.lessonForm.value.resources,
        description: this.lessonForm.value.description,
        section_id: this.sectionId,
      })
      .subscribe((res) => {
        if (res && !(res as ApiResponse).success && !!(res as ApiResponse).message) {
          const message = (res as ApiResponse).errors
            ? Object.values((res as ApiResponse).errors as { [key: string]: string }).join('<br/>')
            : '';
          this.toastrService.error(
            (res as ApiResponse).message + (message ? '<br/><br/>' + message : ''),
          );
          const errors = (res as ApiResponse).errors;
          this.lessonForm.get('title')?.setErrors(errors ? { custom: errors['title'] } : null);
          this.lessonForm.get('article')?.setErrors(errors ? { custom: errors['article'] } : null);
          this.lessonForm
            .get('videoLink')
            ?.setErrors(errors ? { custom: errors['video_url'] } : null);
        } else {
          this.accordionQueryList.first.expanded.delete(0);
          this.toastrService.success('Successfully updated Lesson!');
        }
      });
  }

  public deleteLesson(id: number): void {
    this.courseFormService.isLoading = true;
    this.lessonsApiService.deleteLesson(id).subscribe((res) => {
      if (res && !res.success && res.message) {
        this.toastrService.error(res.message);
      } else {
        (this.lessonForm.parent as FormArray).removeAt(
          (this.lessonForm.parent?.value as Lesson[]).findIndex(
            (lesson) =>
              (lesson.type as unknown as string) === SectionElementType.LESSON && lesson.id === id,
          ),
        );
        this.courseFormService.isLoading = false;
        this.toastrService.success('Lesson deleted successfully');
      }
    });
  }

  public cancelRename() {
    this.lessonForm.get('isEdit')?.setValue(false);
    const courseSection = this.courseFormService.currentCourse?.sections?.find(
      (section) => section.id === this.sectionId,
    );
    const courseLesson = courseSection?.lessons.find(
      (quiz) => quiz.id === this.lessonForm.get('id')?.value,
    );
    this.lessonForm.get('title')?.setValue(courseLesson?.title ? courseLesson.title : '');
  }

  public updateLesson() {
    if (this.lessonForm.get('title')?.valid && this.lessonForm.get('id')) {
      this.courseFormService.isLoading = true;
      this.lessonsApiService
        .updateLesson({
          id: this.lessonForm.get('id')?.value,
          title: this.lessonForm.get('title')?.value,
          description: this.lessonForm.get('description')?.value,
          course_id: this.courseId,
          section_id: this.sectionId,
        })
        .subscribe((res) => {
          if (res && !(res as ApiResponse).success && !!(res as ApiResponse).message) {
            const message = (res as ApiResponse).errors
              ? Object.values((res as ApiResponse).errors as { [key: string]: string }).join(
                  '<br/>',
                )
              : '';
            this.toastrService.error(
              (res as ApiResponse).message + (message ? '<br/><br/>' + message : ''),
            );
            const errors = (res as ApiResponse).errors;
            this.lessonForm.get('title')?.setErrors(errors ? { custom: errors['title'] } : null);
            this.lessonForm
              .get('article')
              ?.setErrors(errors ? { custom: errors['article'] } : null);
            this.lessonForm
              .get('videoLink')
              ?.setErrors(errors ? { custom: errors['video_url'] } : null);
          } else {
            this.lessonForm.get('isEdit')?.setValue(false);
            this.toastrService.success('Successfully updated Section!');
          }

          this.courseFormService.isLoading = false;
        });
    }
  }

  public get descriptionControl(): FormControl {
    return this.lessonForm.get('description') as FormControl;
  }

  public get resourcesControl(): FormControl {
    return this.lessonForm.get('resources') as FormControl;
  }
}
