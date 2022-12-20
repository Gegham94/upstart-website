import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateBrowserLoaderFactory } from './shared/loaders/translate-browser.loader';
import { TranslatedTitleService } from './shared/services/translated-title.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { HeaderModule } from './shared/modules/header/header.module';
import { ButtonModule } from './shared/components/button/button.module';
import { FooterModule } from './shared/modules/footer/footer.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { IconModule } from './shared/components/icon/icon.module';
import { LoadingModule } from './shared/components/loading/loading.module';
import { RouterDataService } from './shared/services/router-data.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthorizationService } from './shared/services/auth/authorization.service';
import { DefaultLayoutModule } from './shared/layouts/default-layout/default-layout.module';
import { DashboardLayoutModule } from './shared/layouts/dashboard-layout/dashboard-layout.module';
import { UnAuthGuard } from './shared/guards/unauth.guard';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorToastComponent } from './shared/components/toast/error.toast';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoModalModule } from './shared/components/info-modal/info-modal.module';
import { LanguageInterceptor } from './shared/interceptors/language.interceptor';
import { registerLocaleData } from '@angular/common';
import localeAm from '@angular/common/locales/hy';
import { CKEditorModule } from 'ckeditor4-angular';
import { CertificateModule } from './shared/components/certificate/certificate.module';

registerLocaleData(localeAm);

@NgModule({
  declarations: [AppComponent, ErrorToastComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    TransferHttpCacheModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      toastComponent: ErrorToastComponent,
    }),
    AppRoutingModule,
    SlickCarouselModule,
    CKEditorModule,
    HeaderModule,
    ButtonModule,
    FooterModule,
    IconModule,
    LoadingModule,
    DefaultLayoutModule,
    DashboardLayoutModule,
    MatDialogModule,
    InfoModalModule,
    CertificateModule,
  ],
  providers: [
    TranslatedTitleService,
    RouterDataService,
    AuthorizationService,
    AuthGuard,
    UnAuthGuard,
    {
      provide: 'PLATFORM_ID',
      useExisting: PLATFORM_ID,
    },
    {
      provide: 'REQUEST',
      useExisting: REQUEST,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
