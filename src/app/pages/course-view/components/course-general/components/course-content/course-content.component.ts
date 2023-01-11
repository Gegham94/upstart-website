import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  CourseDetails,
  Lessons,
  Quiz,
  Section,
} from '../../../../../../shared/interfaces/courses/course-details';
import { MatDialog } from '@angular/material/dialog';
import { CoursePreviewModalComponent } from './course-preview-modal/course-preview-modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SectionType } from 'src/app/shared/enums/section-type';
import { VideoArticleModalComponent } from 'src/app/shared/modules/modal/components/video-article-modal/video-article-modal.component';
import { CourseQuizModalComponent } from './course-quiz-modal/course-quiz-modal.component';
import { Router } from '@angular/router';
interface SliceOptions {
  start: number;
  end: number | undefined;
  default: number;
}
@Component({
  selector: 'us-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  public panelOpenState = false;

  public videoUrl: SafeResourceUrl = '';

  public url: string | undefined;

  public sliceOptions: SliceOptions = {
    start: 0,
    end: 230,
    default: 230,
  };

  public preview: boolean = false;

  public courseData!: CourseDetails;

  public isExpendAllSections: boolean = false;

  public isAllSelected: boolean = false;

  public toggleAction: boolean = false;

  private toggleDesc: boolean = false;

  public lessonIdList: number[] = [];

  @Input()
  public type?: string = '';

  @Input()
  public set course(data: CourseDetails) {
    data.sections.forEach((elem) => {
      elem.isOpen = false;
    });
    this.courseData = data;
  }

  @Input()
  public set isJoined(data: boolean) {
    console.log(data);
  }

  @Output()
  private updated: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialog: MatDialog, private router: Router, private sanitizer: DomSanitizer) {}

  public openDialog(data: Lessons | Quiz, type: string) {
    this.dialog.open(CoursePreviewModalComponent, {
      width: '600px',
      data: { data: data, type: type },
    });
  }

  public ngOnInit() {
    this.preview = this.router.url.includes('preview');
    if (this.course?.sections) {
      this.course.sections.find((leesson) => {
        this.url = leesson.lessons.find((el) => el.video_url !== '')?.video_url;
        if (!this.url) {
          return;
        }
        let embedUrl = this.embedVideo(this.url);
        this.videoUrl = this.getSafeUrl(embedUrl);
      });
    }
  }

  public allQuiz(section: Section) {
    const quiz = [];
    quiz.push(...section.lessons.filter((el) => el.type === 'quiz'));
    return quiz.length;
  }

  public embedVideo(url: string) {
    let youtubeRegExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let yt = url.match(youtubeRegExp);
    if (yt) return '//www.youtube.com/embed/' + yt[1];
    return '';
  }

  public getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public get sectionType(): typeof SectionType {
    return SectionType;
  }

  public expendAllSections(action: boolean): void {
    this.courseData.sections.forEach((section) => {
      if (action) {
        this.isExpendAllSections = true;
        section.isOpen = true;
        this.isAllSelected = true;
      } else {
        this.isExpendAllSections = false;
        this.isAllSelected = false;
        section.isOpen = false;
      }
    });
  }

  public toggleSection(action: boolean, section: Section) {
    this.toggleAction = action;
    if (this.toggleAction) {
      section.isOpen = true;
    } else {
      section.isOpen = false;
    }
    this.checkIsOpenedPanels();
  }

  private checkIsOpenedPanels(): void {
    const statement = this.courseData.sections.every((section) => section.isOpen);
    const someStatement = this.courseData.sections.every((section1) => !section1.isOpen);
    if (statement) {
      this.isExpendAllSections = true;
      this.isAllSelected = true;
    } else if (someStatement) {
      this.isAllSelected = false;
      this.toggleAction = false;
      this.isExpendAllSections = false;
    }
  }

  public toggleDescription(elem: HTMLElement, icon: HTMLElement): void {
    const desc = elem.children[0];
    if (desc?.classList) {
      if (desc.classList.contains('show')) {
        desc.classList.remove('show');
        icon.classList.remove('rotate');
      } else if (!desc.classList.contains('show')) {
        desc.classList.add('show');
        icon.classList.add('rotate');
      }
    }
  }

  public showAboutSection(event: number, lesson: Lessons): void {
    const data = {
      quiz_id: lesson.id,
      id: -1,
      preview: this.preview,
      resources: lesson.resources,
      lesson: lesson,
      course_id: this.courseData.id,
    };
    switch (event) {
      case 1:
        data.id = 1;
        this.openSectionModal(this.dialogConfig('60vw', '90vh', 'article', data));
        break;
      case 2:
        data.id = 2;
        this.openSectionModal(this.dialogConfig('60vw', '90vh', 'video', data));
        break;
      case 3:
        if (lesson.questions[0].your_answers || this.lessonIdList.includes(lesson.id)) {
          this.openAnswersModal(lesson);
          return;
        }
        data.id = 3;
        this.openSectionModal(this.dialogConfig('600px', '100px', 'quiz-modal-section', data));
        break;
    }
  }

  private openSectionModal(config: object): void {
    const dialog = this.dialog.open(VideoArticleModalComponent, config);
    dialog.afterClosed().subscribe((res) => {
      this.updated.emit();
      this.lessonIdList.push(res);
    });
  }

  private dialogConfig(width: string, height: string, panelClass: string, data: object): object {
    const config = {
      width: width,
      height: height,
      panelClass: panelClass,
      data: data,
    };
    return config;
  }

  public openAnswersModal(lesson: Lessons) {
    this.dialog.open(CourseQuizModalComponent, {
      panelClass: 'attention-dialog',
      width: '40vw',
      minHeight: '260px',
      data: {
        lesson,
      },
    });
  }
}
