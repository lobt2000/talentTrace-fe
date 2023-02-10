import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signInUp',
  templateUrl: './signInUp.component.html',
  styleUrls: ['./signInUp.component.scss']
})
export class SignInUpComponent implements OnInit {
  activeTab: string = 'user';
  @Input() typeOfAction: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  changeTab(type: string) {
    this.activeTab = type;
  }

}
