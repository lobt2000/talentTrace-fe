import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonUrls } from '../shared/constansts/common/common.constants';
import { Router } from '@angular/router';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {}

  loginByCompany(data) {
    const body = {
      email: data.email,
      password: data.password,
    };
    this.loadingService.setLoading(true);
    this.authService.loginByCompany(body).subscribe((res) => {
      this.authService.setValueToLocalBase(res.data);
      this.loadingService.setLoading(false);
    });
  }

  loginUser(data) {
    const body = {
      email: data.email,
      password: data.password,
      companyEmail: data.companyEmail,
    };
    this.loadingService.setLoading(true);
    this.authService.loginUser(body).subscribe((res) => {
      this.authService.setValueToLocalBase(res.data);
      this.loadingService.setLoading(false);
    });
  }
}
