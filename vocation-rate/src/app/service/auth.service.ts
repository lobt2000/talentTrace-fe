import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  getToken(userData) {
    this.http
      .post('/api/getToken', {
        username: userData.email,
        password: userData.password,
        ...(userData.companyEmail && { companyEmail: userData.companyEmail }),
      })
      .subscribe((res) => {
        if (res && res['access_token']) {
          localStorage.setItem('user_profile', JSON.stringify(res));
        }
      });
  }

  validateLogin(user: any) {
    return this.http.post('/api/user/login', {
      username: user.username,
      password: user.password,
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
