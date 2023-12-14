import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.tempCheckAuthError(error);
        this.loadingService.setLoading(false);
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
