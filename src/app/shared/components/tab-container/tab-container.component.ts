import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss'],
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
