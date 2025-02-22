import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from '../environments/environment';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {httpInterceptor} from "./shared/interceptor/http.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarModule, DateAdapter} from "angular-calendar";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    importProvidersFrom([
      CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
      AngularFireModule.initializeApp(environment.firebase),
    ]),
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideAnimations(),
    provideToastr(),
  ]
};
