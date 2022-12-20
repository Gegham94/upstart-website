import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  CurrentUserInfoInterface,
  UploadFileData,
  UploadFileResponse,
} from '../../interfaces/current-user.interface';
import { UploadFileService } from '../../services/upload-file.service';
import { Subject, takeUntil } from 'rxjs';
import { Trainer } from '../../interfaces/trainer/trainer';
import { ToastrService } from 'ngx-toastr';
import { TrainerCourse } from '../../interfaces/courses/trainer-course';
import { TrainerReview } from '../../interfaces/reviews/trainer-review';
import { UserRole } from '../../enums/user-role';

@Component({
  selector: 'us-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss', './user-info-component.media.scss'],
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input()
  public userInfo?: CurrentUserInfoInterface | Trainer | null;

  @Input()
  public courses?: TrainerCourse[];

  @Input()
  public trainerReview?: TrainerReview[];

  @Input()
  public hasHeadline?: boolean = false;

  @Input()
  public page?: string = '';

  @Input()
  public canUpload?: boolean = true;

  @Input()
  public deleteImg?: boolean = false;

  @Input()
  public changeImg?: string;

  @Input()
  public doRefactor?: boolean = false;

  @Output()
  public imgSrc: EventEmitter<UploadFileData> = new EventEmitter<UploadFileData>();

  @ViewChild('input')
  public inputRef: ElementRef<HTMLInputElement>;

  public unsubscribe$: Subject<void> = new Subject<void>();

  public imagePath?: string | ArrayBuffer | null;

  public loader: boolean = false;

  // @ts-ignore
  private fileEvent?: Event2;

  constructor(private uploadFileService: UploadFileService, private toastr: ToastrService) {}

  public ngOnInit(): void {
    this.imagePath = this.changeImg ? this.changeImg : this.userInfo?.avatar;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['changeImg']) {
      this.imagePath = changes['changeImg'].currentValue;
    }
  }

  public get nameFirstLetters() {
    if (this.userInfo) {
      return this.userInfo?.first_name[0] + this.userInfo?.last_name[0];
    } else {
      return;
    }
  }

  public showUploadModal() {
    this.inputRef.nativeElement.click();
  }

  public get getTypeForUploadImg() {
    if (this.page === 'profile') {
      return 'user';
    }
    return '';
  }

  // @ts-ignore
  public onImageUpload(ev: Event2) {
    this.fileEvent = ev;
    let file;
    this.loader = true;
    file = ev.target.files[0];
    const body = {
      file,
      type: this.getTypeForUploadImg,
    };

    this.uploadFileService
      .uploadFile(body)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((filePath: UploadFileResponse) => {
        this.imagePath = filePath.data.url;
        this.imgSrc.emit(filePath.data);
      });
  }

  public deleteAvatar() {
    this.uploadFileService
      .deleteUserAvatar()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res.success) {
          this.toastr.success(res.message);
          this.imgSrc.emit(undefined);
          this.imagePath = '';
          if (this.fileEvent && this.fileEvent.target) this.fileEvent.target.value = '';
        } else {
          this.toastr.error(res.message);
        }
      });
  }

  public get userRoles(): typeof UserRole {
    return UserRole;
  }
}
