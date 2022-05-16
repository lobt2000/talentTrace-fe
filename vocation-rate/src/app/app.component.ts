import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vocation-rate';
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.validateLogin();
  }

  validateLogin() {
    this.loginService.validateLogin({
      username: 'roy', password: '123'
    }).subscribe(result => {
      console.log('result is ', result);
    }, error => {
      console.log('error is ', error);
    });
  }
}
