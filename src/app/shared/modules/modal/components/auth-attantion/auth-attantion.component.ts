import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'us-auth-attantion',
  templateUrl: './auth-attantion.component.html',
  styleUrls: ['./auth-attantion.component.scss'],
})
export class AuthAttantionComponent {
  constructor(private dialogRef: MatDialogRef<AuthAttantionComponent>, private router: Router) {}

  public redirect(): void {
    this.dialogRef.close();
    this.router.navigate(['/auth/login']);
  }
}
