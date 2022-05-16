import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  validateLogin(user: any) {
    return this.http.post('/api/user/login', {
      username: user.username,
      password: user.password
    })
  }
}
