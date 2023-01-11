import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailSubscribeComponent } from 'src/app/shared/components/email-subscribe/components/email-subscribe.component';
import { EmailSubscribeService } from 'src/app/shared/services/subscribe-email/email-subscribe.service';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';

@Component({
  selector: 'us-home-join-us',
  templateUrl: './home-join-us.component.html',
  styleUrls: ['./home-join-us.component.scss', './home-join-us.component.media.scss'],
})
export class HomeJoinUsComponent {
  public readonly buttonTheme = ButtonTheme;

  public errorMessage: string = '';

  public disableSubscribeBtn: boolean = false;

  constructor(private subscribeService: EmailSubscribeService, private dialog: MatDialog) {}

  public subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public subscribe(): void {
    this.disableSubscribeBtn = true;
    const obj = this.subscribeForm.getRawValue();
    this.subscribeService.subscribeToEmail(obj).subscribe(
      (res) => {
        if (res.success) {
          this.openDialog(res.message);
        } else {
          this.errorMessage = res.errors.email[0];
        }
      },
      (err) => {
        console.log(err);
      },
    );
  }

  public openDialog(data?: string): void {
    const dialog = this.dialog.open(EmailSubscribeComponent, {
      width: '500px',
      height: '200px',
      panelClass: 'subscribe-email',
      data: data,
    });
    dialog.afterClosed().subscribe((event: boolean) => {
      if (event) {
        this.subscribeForm.reset();
        this.disableSubscribeBtn = false;
      }
    });
  }
}
