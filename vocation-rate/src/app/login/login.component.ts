import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CommonUrls } from '../shared/constansts/common.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  typeOfAction = this.router.url.includes(CommonUrls.Login);
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login(data) {
    this.loginService.getToken(data)
  }
}
