import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUrls } from '../shared/constansts/common.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  typeOfAction = this.router.url.includes(CommonUrls.Login);
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
