import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translateService: TranslateService) {}

  changeLanguage(lang: number) {
    localStorage.setItem('langId', JSON.stringify(lang));
    this.translateService.use(lang ? 'ua' : 'en');
  }

  get currentLang() {
    const lang = +localStorage.getItem('langId');
    return this.translateService.currentLang
      ? this.translateService.currentLang
      : lang
        ? 'ua'
        : 'en';
  }
}
