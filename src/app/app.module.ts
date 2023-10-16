import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule  } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslocoRootModule } from './transloco-root.module';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
         loader: {
           provide: TranslateLoader,
           useFactory: createTranslateLoader,
           deps: [HttpClient]
         }
       }),
    TranslocoRootModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'en-US' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
