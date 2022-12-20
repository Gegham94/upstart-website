import { Component, Inject } from '@angular/core';
import { ModalTypeEnum } from '../../enums/modal-type.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonTheme } from '../../enums/button-theme.enum';
import { Router } from '@angular/router';

interface DialogData {
  type: string;
}

@Component({
  selector: 'us-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
})
export class InfoModalComponent {
  public readonly modalTypeEnum = ModalTypeEnum;

  public readonly buttonTheme = ButtonTheme;

  constructor(
    private readonly router: Router,
    public dialog: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  public close() {
    this.dialog.close();
    this.router.navigate(['auth/login']);
  }
}
