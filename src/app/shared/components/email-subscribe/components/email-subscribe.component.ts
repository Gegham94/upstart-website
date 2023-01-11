import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'us-email-subscribe',
  templateUrl: './email-subscribe.component.html',
  styleUrls: ['./email-subscribe.component.scss'],
})
export class EmailSubscribeComponent {
  public message: string = '';

  constructor(
    private matDialogRef: MatDialogRef<EmailSubscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.message = data;
  }

  public closeDialog(): void {
    this.matDialogRef.close(true);
  }
}
