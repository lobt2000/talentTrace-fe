import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collapse-item-list',
  templateUrl: './collapse-item-list.component.html',
  styleUrls: ['./collapse-item-list.component.scss'],
})
export class CollapseItemListComponent implements OnInit {
  @Input() title: string = '';
  @Input() noItems: string = 'items';
  @Input() itemsList: any[] = [];
  @Input() moreOptions: Array<any> = [];
  @Output() goToItem: EventEmitter<any> = new EventEmitter();
  @Output() addItem: EventEmitter<any> = new EventEmitter();
  @Output() triggerOption: EventEmitter<any> = new EventEmitter();

  constructor() {}

  showContent(item, property) {
    return item.hasOwnProperty(property);
  }

  ngOnInit(): void {
    console.log(this.itemsList);
  }

  onGoToItem(item) {
    this.goToItem.emit(item);
  }

  onAddItem() {
    this.addItem.emit(true);
  }

  onTriggerOption(event) {
    this.triggerOption.emit(event);
  }
}
