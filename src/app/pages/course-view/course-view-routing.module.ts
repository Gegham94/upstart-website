import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseViewComponent } from './components/course-view.component';

const routes: Routes = [
  {
    path: '',
    component: CourseViewComponent,
  },
  {
    path: 'preview',
    pathMatch: 'full',
    component: CourseViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseViewRoutingModule {}
