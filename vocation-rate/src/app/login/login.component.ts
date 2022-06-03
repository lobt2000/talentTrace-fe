import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  activeTab: string = 'user'
  constructor() { }

  ngOnInit(): void {
  }

  changeTab(type: string) {
    this.activeTab = type;
  }

}
