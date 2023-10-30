import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('userAuth')
      ? JSON.parse(this.cookieService.get('userAuth'))
      : '';
    if (token) {
      request = request.clone({
        headers: request.headers.set(
          'authorization',
          token.token_type + ' ' + token.access_token,
        ),
      });
    }
    return next.handle(request).pipe();
  }
}
