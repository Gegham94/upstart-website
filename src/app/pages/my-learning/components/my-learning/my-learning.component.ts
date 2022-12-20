import { Component, OnInit } from '@angular/core';
import { ButtonTheme } from '../../../../shared/enums/button-theme.enum';
import { Currency } from 'src/app/shared/enums/currency';
import { MyLearningsService } from 'src/app/shared/services/my-learnings/my-learnings.service';
import { MyLearnings } from 'src/app/shared/interfaces/my-learnings/my-learnings';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'us-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.scss', './my-learning.component.media.scss'],
})
export class MyLearningComponent implements OnInit {
  public readonly buttonTheme = ButtonTheme;

  public courses: MyLearnings[];

  public errorMessage: string = '';

  public showLoader: boolean = false;

  public showEmptyMessage: boolean = false;

  constructor(private readonly myLearnings: MyLearningsService, private toastr: ToastrService) {}

  public ngOnInit() {
    this.getMyLearnings();
  }

  private getMyLearnings(): void {
    this.myLearnings.getMyLearnings().subscribe(
      (res) => {
        if (!res.data) {
          this.showEmptyMessage = true;
        } else if (!res.success) {
          this.toastr.error(res.message);
        }
        this.courses = res.data;
        this.showLoader = false;
      },
      (error) => this.toastr.error(error.message),
    );
  }

  public get currencyType(): typeof Currency {
    return Currency;
  }
}
