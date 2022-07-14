import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vocation-rate';
  constructor(private loginService: LoginService, private translateService: TranslateService) {
    translateService.addLangs(['en', 'ua']);
    const lang = +localStorage.getItem('langId');
    translateService.setDefaultLang(lang == 1 ? 'ua' : 'en');
   }

  ngOnInit(): void {
    this.validateLogin();
  }

  validateLogin() {
    // this.loginService.validateLogin({
    //   username: 'roy', password: '123'
    // }).subscribe(result => {
    //   console.log('result is ', result);
    // }, error => {
    //   console.log('error is ', error);
    // });
  }
}
