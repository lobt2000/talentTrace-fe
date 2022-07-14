import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/service/language.service';

@Component({
  selector: 'app-ui-toggle',
  templateUrl: './ui-toggle.component.html',
  styleUrls: ['./ui-toggle.component.scss']
})
export class UiToggleComponent implements OnInit {
  isLanguageChange: boolean;
  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
  }


  changeLang() {
    this.isLanguageChange = !this.isLanguageChange;
    !this.isLanguageChange ? this.languageService.changeLanguage(0) : this.languageService.changeLanguage(1);
  }

}
