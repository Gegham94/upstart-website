import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardResourcesRoutingModule } from './dashboard-resources-routing.module';
import { DashboardResourcesComponent } from './components/dashboard-resources/dashboard-resources.component';
import { IconModule } from 'src/app/shared/components/icon/icon.module';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ClickOutsideModule } from 'src/app/shared/directives/click-outside/click-outside.module';
import { ResourceUploadDialogComponent } from './components/resource-upload-dialog/resource-upload-dialog/resource-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { TooltipModule } from 'src/app/shared/directives/tooltip/tooltip.module';
import { DropdownModule } from 'src/app/shared/directives/dropdown/dropdown.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [DashboardResourcesComponent, ResourceUploadDialogComponent],
  imports: [
    CommonModule,
    DashboardResourcesRoutingModule,
    IconModule,
    ClickOutsideModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    TooltipModule,
    DropdownModule,
    MatProgressSpinnerModule,
    ToastrModule,
  ],
  providers: [FileUploadService],
})
export class DashboardResourcesModule {}
