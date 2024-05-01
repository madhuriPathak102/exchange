import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

const TOKEN_HEADER_KEY = 'ACCESS-TOKEN';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  progressRef: NgProgressRef;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: TokenStorageService, private authService: AuthService, private spinner: NgxSpinnerService, private progress: NgProgress) {
    this.progressRef = progress.ref('myProgress');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let data: any = localStorage.getItem('data');
    data = JSON.parse(data)
    const authToken = data?.token

    if (authToken) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];