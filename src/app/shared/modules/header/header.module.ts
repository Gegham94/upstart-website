import { CourseModule } from '../course/course.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { HeaderActionPanelComponent } from './components/header-action-panel/header-action-panel.component';
import { IconModule } from '../../components/icon/icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '../../components/button/button.module';
import { HeaderLanguageComponent } from './components/header-language/header-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderMobileMenuComponent } from './components/header-mobile-menu/header-mobile-menu.component';
import { ClickOutsideModule } from '../../directives/click-outside/click-outside.module';
import { HeaderComponent } from './components/header.component';
import { RouterModule } from '@angular/router';
import { HeaderMobileActionPanelComponent } from './components/header-mobile-action-panel/header-mobile-action-panel.component';
import { HeaderNotificationComponent } from './components/header-notification/header-notification.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeaderCategoriesComponent } from './components/header-categories/header-categories.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderSearchComponent,
    HeaderActionPanelComponent,
    HeaderLanguageComponent,
    HeaderMobileMenuComponent,
    HeaderMobileActionPanelComponent,
    HeaderNotificationComponent,
    HeaderCategoriesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    IconModule,
    ButtonModule,
    TranslateModule,
    ClickOutsideModule,
    RouterModule,
    DialogModule,
    CourseModule,
    SlickCarouselModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  exports: [
    HeaderComponent,
    HeaderSearchComponent,
    HeaderActionPanelComponent,
    HeaderMobileMenuComponent,
    HeaderLanguageComponent,
  ],
})
export class HeaderModule {}
