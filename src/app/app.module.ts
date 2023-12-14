import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UiLoaderComponent } from './shared/components/ui/ui-loader/ui-loader.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { tap } from 'rxjs';

function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    '../assets/i18n/',
    '.json?cb=' + new Date().getTime(),
  );
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    UiLoaderComponent,
    MatDialogModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyD95W0lvAu6jV03YXxotXvBKI7EXC3VOPk",
    //   libraries: ["places"]
    // }),
    // GooglePlaceModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
