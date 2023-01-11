import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DashboardLessonsModalData } from '../interfaces/dashboard-lessons-modal-data.interface';
import { ButtonTheme } from '../../../../../../../../../shared/enums/button-theme.enum';
import { DashboardLessonsModalResult } from '../interfaces/dashboard-lessons-modal-result.interface';

@Component({
  selector: 'us-dashboard-lessons-modal',
  templateUrl: './dashboard-lessons-modal.component.html',
  styleUrls: ['./dashboard-lessons-modal.component.scss'],
})
export class DashboardLessonsModalComponent {
  public readonly buttonTheme = ButtonTheme;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DashboardLessonsModalData,
    private readonly dialog: MatDialogRef<
      DashboardLessonsModalComponent,
      DashboardLessonsModalResult
    >,
  ) {}

  public save() {
    this.dialog.close({
      isSave: true,
      lessonGroupListControls: this.data.lessonGroupListControls,
    });
  }

  public cancel() {
    this.dialog.close({
      isSave: false,
    });
  }
}
