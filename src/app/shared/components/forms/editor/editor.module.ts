import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './components/editor.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { IconModule } from '../../icon/icon.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, CKEditorModule, IconModule],
  exports: [EditorComponent],
})
export class EditorModule {}
