import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter} from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {routes} from './app.routes';
import {AuthInterceptor} from "./interceptors/authInterceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
        withInterceptorsFromDi() // 必須有這行，才能讓 class-based interceptor 生效
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // 必須為 true，代表可以有多個攔截器
    }
  ]
};
