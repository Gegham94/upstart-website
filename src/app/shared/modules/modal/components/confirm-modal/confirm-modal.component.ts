import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'us-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  constructor(private dialogFef: MatDialogRef<ConfirmModalComponent>) {}

  public action(event: boolean) {
    this.dialogFef.close(event);
  }
}
