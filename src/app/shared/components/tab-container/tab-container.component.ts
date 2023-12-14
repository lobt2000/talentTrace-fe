import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignUpComponent } from '../signUp/signUp.component';
import { SignInComponent } from '../signIn/signIn.component';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
  standalone: true,
  imports: [CommonModule, SignUpComponent, SignInComponent],
})
export class TabContainerComponent implements OnInit {
  activeTab: string = 'user';
  @Input() typeOfAction: string = 'login';
  @Output() formUserValue: EventEmitter<any> = new EventEmitter();
  @Output() formCompanyValue: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  changeTab(type: string) {
    this.activeTab = type;
  }

  onGetFormValue(event) {
    'companyEmail' in event
      ? this.formUserValue.emit(event)
      : this.formCompanyValue.emit(event);
  }
}
