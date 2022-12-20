import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyLearningComponent } from './components/my-learning/my-learning.component';

const routes: Routes = [{ path: '', component: MyLearningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLearningRoutingModule {}
