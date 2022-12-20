import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs.component';
import { TabComponent } from './components/tab/tab.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TabsComponent, TabComponent],
  imports: [CommonModule, IconModule],
  exports: [TabsComponent, TabComponent],
})
export class TabsModule {}
