import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, switchMap } from 'rxjs';
import { CommonUrls } from '../shared/constansts/common/common.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  getToken(userData) {
    this.http
      .post('/api/getToken', {
        username: userData.email,
        password: userData.password,
        ...(userData.companyEmail && { companyEmail: userData.companyEmail }),
      })
      .subscribe((res) => {
        if (res && res['access_token']) {
          localStorage.setItem('userAuth', JSON.stringify(res));
          this.cookieService.set('userAuth', JSON.stringify(res));
        }
      });
  }

  validateLogin(user: any): Observable<any> {
    return this.http.post('/api/v1/login', {
      email: user.email,
      password: user.password,
    });
  }

  logout() {
    localStorage.clear();
    this.cookieService.deleteAll('/', 'localhost');
    this.router.navigate(['home']);
  }

  signUpCompany(body): Observable<any> {
    return this.http
      .post('/api/v1/signUpCompany', body)
      .pipe(switchMap((res) => this.setTokenValue(res)));
  }

  signUpManager(body): Observable<any> {
    return this.http.post('/api/v1/signUpManager', body);
  }

  loginByCompany(body): Observable<any> {
    return this.http
      .post('/api/v1/loginByCompany', body)
      .pipe(switchMap((res) => this.setTokenValue(res)));
  }

  loginUser(body): Observable<any> {
    return this.http
      .post('/api/v1/loginUser', body)
      .pipe(switchMap((res) => this.setTokenValue(res)));
  }

  getinitUser(): Observable<any> {
    return this.http.get('/api/v1/users');
  }

  setValueToLocalBase(role) {
    localStorage.setItem('userType', role);
    this.router.navigate([CommonUrls.Manager]);
  }

  setTokenValue(token): Observable<any> {
    if (token && token['access_token']) {
      delete token['status'];
      localStorage.setItem('userAuth', JSON.stringify(token));
      this.cookieService.set('userAuth', JSON.stringify(token));
      return this.getinitUser();
    }
  }

  updateManagerPass(body): Observable<any> {
    return this.http
      .patch('/api/v1/updateManagerPassword', body)
      .pipe(switchMap((res) => this.setTokenValue(res)));
  }
}
