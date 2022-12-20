import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipOrientationEnum } from 'src/app/shared/enums/tooltip-orientation.enum';
import { ResourceUpload } from 'src/app/shared/interfaces/resources/resource-upload';
import { ResourceUploadDialogComponent } from '../resource-upload-dialog/resource-upload-dialog/resource-upload-dialog.component';
import { ResourceService } from '../../../../../../shared/services/resources/resource.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'us-dashboard-resources',
  templateUrl: './dashboard-resources.component.html',
  styleUrls: ['./dashboard-resources.component.scss'],
})
export class DashboardResourcesComponent implements OnInit {
  public resources?: ResourceUpload[];

  public readonly tooltipOrientation = TooltipOrientationEnum;

  public progress: number = 5;

  public megabytes: number = -1;

  public loading: boolean = true;

  public fileUrl: string = '';

  constructor(
    private dialog: MatDialog,
    private resourceService: ResourceService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.getResources();
  }

  public openUploadDialog(): void {
    const dialog = this.dialog.open(ResourceUploadDialogComponent, {
      width: '600px',
      height: '381px',
      panelClass: 'upload-dialog',
      data: false,
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.addDataToShow(res);
        this.megabytes = res.byte;
        this.createResource(res);
      }
    });
  }

  public openDeleteDialog(event: ResourceUpload): void {
    const dialog = this.dialog.open(ResourceUploadDialogComponent, {
      width: '600px',
      height: '281px',
      panelClass: 'upload-dialog',
      data: true,
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.deleteResource(event.id);
      }
    });
  }

  public openEditDialog(event: ResourceUpload): void {
    const dialog = this.dialog.open(ResourceUploadDialogComponent, {
      width: '600px',
      height: '381px',
      panelClass: 'upload-dialog',
      data: event,
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        event.title = res.title;
        this.updateResource(event);
      }
    });
  }

  private animateProgress(): void {
    this.progress = 5;
    const animation = setInterval(() => {
      if (this.progress % 2 === 0) {
        this.progress += 6;
      } else {
        this.progress += 3;
      }
      if (this.progress > 100) {
        this.progress = 99;
        clearInterval(animation);
      }
    }, 1000);
  }

  private createResource(data: ResourceUpload): void {
    this.animateProgress();
    this.resourceService.addResource(data).subscribe(
      () => {
        this.toastrService.success(
          this.translateService.instant('global.footer.resources.add_success'),
        );
        this.getResources();
        this.resources?.pop();
      },
      (error) => this.toastrService.error(error.message),
    );
  }

  private getResources(): void {
    this.loading = true;
    this.resourceService.getResources().subscribe((res) => {
      this.resources = res.data.data;
      this.loading = false;
    });
  }

  private deleteResource(id: number): void {
    this.loading = true;
    this.resourceService.deleteResource(id).subscribe(
      () => {
        this.toastrService.success(
          this.translateService.instant('global.footer.resources.remove_success'),
        );
        this.getResources();
      },
      (error) => this.toastrService.error(error.message),
    );
  }

  private updateResource(data: ResourceUpload): void {
    this.loading = true;
    this.resourceService.updateResource(data).subscribe(
      () => {
        this.toastrService.success(this.translateService.instant('global.footer.resources.update'));
        this.getResources();
      },
      (error) => this.toastrService.error(error.message),
    );
  }

  public openDownloadModal(data: ResourceUpload): void {
    const dialog = this.dialog.open(ResourceUploadDialogComponent, {
      width: '600px',
      height: '281px',
      panelClass: 'upload-dialog',
      data: 3,
    });
    dialog.afterClosed().subscribe((res) => {
      const fileFormats = ['doc', 'xls'];
      if (res) {
        const path = data.path.split('.').reverse();
        const format = path[0];
        if (!fileFormats.includes(format) || !fileFormats.includes(format)) {
          window.open(data.path);
        } else {
          alert('doc or xls');
        }
      }
    });
  }

  private addDataToShow(res: ResourceUpload): void {
    const obj = {
      title: res.title,
      id: -1,
      path: res.file,
      fileName: res.fileName,
    } as ResourceUpload;
    this.resources?.push(obj);
  }
}
