import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
export class TabContainerComponent implements OnInit {
  activeTab: string = 'user';
  @Input() typeOfAction: string = 'login';
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  changeTab(type: string) {
    this.activeTab = type;
  }

  onGetFormValue(event) {
    this.formValue.emit(event);
  }
}
