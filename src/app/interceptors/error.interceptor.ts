import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.tempCheckAuthError(error);
        return throwError(error);
      }),
    );
  }

  tempCheckAuthError(error) {
    if (error.status === 401) {
      this.router.navigate(['/home']);
      return;
    }
    if (error.status === 429) {
      this.router.navigate(['/home']);
      return;
    }
  }
}
