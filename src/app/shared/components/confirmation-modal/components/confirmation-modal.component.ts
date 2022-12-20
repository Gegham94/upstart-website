import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonTheme } from '../../../enums/button-theme.enum';

interface DialogData {
  confirmed: Function;
  cancelled: Function;
  description: string;
  title: string;
}

@Component({
  selector: 'us-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  public readonly buttonTheme = ButtonTheme;

  constructor(
    public dialog: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}
