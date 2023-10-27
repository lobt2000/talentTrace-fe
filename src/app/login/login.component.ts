import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginByCompany(data) {
    const body = {
      email: data.email,
      password: data.password,
    };
    this.authService.loginByCompany(body).subscribe((res) => {
      console.log(res);
    });
  }
}
