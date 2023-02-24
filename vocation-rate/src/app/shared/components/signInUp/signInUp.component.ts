import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-signInUp',
  templateUrl: './signInUp.component.html',
  styleUrls: ['./signInUp.component.scss']
})
export class SignInUpComponent implements OnInit {
  activeTab: string = 'user';
  @Input() typeOfAction: boolean = true;
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  changeTab(type: string) {
    this.activeTab = type;
  }

  onGetFormValue(event) {
    this.formValue.emit(event);
  }

}
