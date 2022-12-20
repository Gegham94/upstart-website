import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Lessons } from '../../../../../../../shared/interfaces/courses/course-details';
import { ButtonTheme } from '../../../../../../../shared/enums/button-theme.enum';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'us-course-preview-modal',
  templateUrl: './course-preview-modal.component.html',
  styleUrls: ['./course-preview-modal.component.scss'],
})
export class CoursePreviewModalComponent implements OnInit {
  public videoUrl: SafeResourceUrl = '';

  public questionData = [
    {
      type: 1,
      answer1: 'answe 1',
      answer2: 'answe 1',
      answer3: 'answe 1',
    },
    {
      type: 0,
      answer1: 'answe 2',
      answer2: 'answe 2',
      answer3: 'answe 2',
    },
    {
      type: 1,
      answer1: 'answe 3',
      answer2: 'answe 3',
      answer3: 'answe 3',
    },
    {
      type: 0,
      answer1: 'answe 4',
      answer2: 'answe 4',
      answer3: 'answe 4',
    },
  ];

  public step = 0;

  public readonly buttonTheme = ButtonTheme;

  constructor(
    private _formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    public dialog: MatDialogRef<CoursePreviewModalComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Lessons,
    @Inject(MAT_DIALOG_DATA) public type: string,
  ) {}

  public ngOnInit() {
    if (this.data.data?.video_url) {
      let embedUrl = this.embedVideo(this.data.data?.video_url);
      this.videoUrl = this.getSafeUrl(embedUrl);
    }
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

  public nexStep() {
    if (this.step === this.questionData.length + 1) {
      this.dialog.close();
      return;
    }
    this.step++;
  }

  public backStep() {
    if (this.step === 0) {
      this.dialog.close();
    } else {
      this.step--;
    }
  }
}
