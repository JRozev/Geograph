import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavigationModule} from "./navigation/navigation.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbToastrModule, NbDatepickerModule, NbSpinnerModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormGroupDirective} from "@angular/forms";
import {LoadingInterceptor} from "./interceptor/loading.interceptor";
import { CountriesModeModule } from './countries-mode/countries-mode.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NavigationModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSpinnerModule,
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    CountriesModeModule,
  ],
  providers: [
    FormGroupDirective,
    {provide: LOCALE_ID, useValue: 'bg-BG'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
