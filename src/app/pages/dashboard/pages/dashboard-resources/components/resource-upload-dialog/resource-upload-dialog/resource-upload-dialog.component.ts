import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceUpload } from 'src/app/shared/interfaces/resources/resource-upload';

@Component({
  selector: 'us-resource-upload-dialog',
  templateUrl: './resource-upload-dialog.component.html',
  styleUrls: ['./resource-upload-dialog.component.scss'],
})
export class ResourceUploadDialogComponent implements OnInit {
  public fileName = '';

  public fileSize = -1;

  public isBigSize: boolean = false;

  public action: boolean | ResourceUpload | number;

  public loader: boolean = false;

  public isEdit: boolean = false;

  public isDownload: boolean = false;

  public editableFile: ResourceUpload;

  public resourceForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    path: new FormControl('', Validators.required),
    byte: new FormControl(''),
    fileName: new FormControl(''),
  });

  constructor(
    private fileUploadService: FileUploadService,
    @Inject(MAT_DIALOG_DATA) public data: boolean | ResourceUpload | number,
    private dialog: MatDialogRef<ResourceUploadDialogComponent>,
  ) {}

  public ngOnInit(): void {
    if (this.data && this.data !== 3) {
      this.action = this.data;
      if (typeof this.data === 'object') {
        this.isEdit = true;
        this.fileName = this.getFileName(this.data.path);
        this.resourceForm.patchValue(this.data);
      }
    } else if (!this.data) {
      this.action = this.data;
    } else if (this.data === 3) {
      this.isDownload = true;
    }
  }

  public uploadFile(event: Event): void {
    this.isBigSize = false;
    this.loader = true;
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files && files[0].size < 20971520) {
      this.resourceForm.controls.fileName.setValue(this.fileName);
      this.resourceForm.controls.byte.setValue(this.byteConverter(files[0].size));
      this.fileName = files[0].name;
      this.fileUploadService.uploadFile(files[0], 'resource').subscribe((res) => {
        this.resourceForm.controls.path.setValue(res.data.path);
        this.loader = false;
      });
    } else {
      this.isBigSize = true;
      this.loader = false;
    }
  }

  public fetch(): void {
    this.dialog.close(this.resourceForm.getRawValue());
  }

  public delete(): void {
    this.dialog.close(true);
  }

  private byteConverter(byte: number) {
    let bytes = String(byte);
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0,
      n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l];
  }

  private getFileName(path: string): string {
    return path.split('_')[1];
  }
}
