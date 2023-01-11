import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ButtonTheme } from '../../../enums/button-theme.enum';
import { CertificateService } from '../../../services/certificate/certificate.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CertificateInterface } from '../../../interfaces/certificate/certificate.interface';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

interface DialogData {
  course: number;
  type: string;
  coursePassed: boolean;
}

@Component({
  selector: 'us-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss', './certificate.component.media.scss'],
})
export class CertificateComponent implements OnInit, OnDestroy {
  @ViewChild('pdfTable')
  public pdf!: ElementRef;

  public loader: boolean = false;

  public loaderDate: boolean = true;

  public studentName: string;

  public title: string;

  public subTitle: string;

  public forUser: string;

  public descriptionTitle: string;

  public description: string;

  public signature?: string;

  public completedDate?: string;

  public certificateData: CertificateInterface;

  public readonly buttonTheme = ButtonTheme;

  public subscrebtion$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public certificateService: CertificateService,
    @Inject(MAT_DIALOG_DATA) public id: DialogData,
    @Inject(MAT_DIALOG_DATA) public page: DialogData,
    public toastrService: ToastrService,
    public dialog: MatDialogRef<CertificateComponent>,
    private translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    if (this.page.type === 'pdf') {
      this.certificateService
        .getCertificatePDF(this.id.course)
        .pipe(takeUntil(this.subscrebtion$))
        .subscribe((data) => {
          this.completedDate = formatDate(new Date(), 'dd/MM/YYYY', 'en');
          this.patchData(data.data);
        });
    } else {
      this.certificateService
        .getCertificate(this.id.course)
        .pipe(takeUntil(this.subscrebtion$))
        .subscribe((data) => {
          this.patchData(data.data);
        });
    }
  }

  public patchData(data: CertificateInterface) {
    this.certificateData = data;
    this.title = this.certificateData.headline1;
    this.subTitle = this.certificateData.headline2;
    this.forUser = this.certificateData.headline3;
    this.descriptionTitle = this.certificateData.description;
    this.description = this.certificateData.course_title;
    this.signature = this.certificateData.signature;
    this.studentName = this.certificateData.student_name ?? '[ Student Name ]';
    this.loaderDate = false;
  }

  public ngOnDestroy() {
    this.subscrebtion$.next(true);
    this.subscrebtion$.complete();
  }

  public downloadAsPDF() {
    this.loader = true;
    html2canvas(this.pdf.nativeElement).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('landscape', 'px', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('certificate.pdf');
      this.loader = false;
      this.dialog.close();
    });
  }

  public saveChanges() {
    this.loader = true;
    const body = {
      headline1: this.title,
      headline2: this.subTitle,
      headline3: this.forUser,
      signature: this.signature,
      course_id: this.certificateData.course_id,
      course_title: this.description,
      description: this.descriptionTitle,
    };
    this.certificateService.saveCertificateData(body).subscribe((res) => {
      if (res.success) {
        this.toastrService.success(this.translateService.instant('toast-messages.update'));
      } else {
        this.toastrService.error(res.message);
      }
      this.loader = false;
      this.dialog.close();
    });
  }
}
