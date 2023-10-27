import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'talentTrace-fe';
  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
  ) {
    translateService.addLangs(['en', 'ua']);
    const lang = +localStorage.getItem('langId');
    translateService.setDefaultLang(lang == 1 ? 'ua' : 'en');

    // const loader = new Loader({
    //   apiKey: "AIzaSyD95W0lvAu6jV03YXxotXvBKI7EXC3VOPk",
    //   version: "weekly",
    //   libraries: ["places"]
    // });

    // loader.load().then(async () => {
    //   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    //   map = new Map(document.getElementById("map") as HTMLElement, {
    //     center: { lat: -34.397, lng: 150.644 },
    //     zoom: 8,
    //   });
    // });
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
