import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-item-list',
  templateUrl: './collapse-item-list.component.html',
  styleUrls: ['./collapse-item-list.component.scss'],
})
export class CollapseItemListComponent implements OnInit {
  @Input() title: string = '';
  @Input() noItems: string = 'items';
  @Input() itemsList: any[] = [];

  constructor() {}

  showContent(item, property) {
    return item.hasOwnProperty(property);
  }

  ngOnInit(): void {}
}
