import { Component, OnInit } from '@angular/core';
import { UserType } from '../../constansts/user-type.model';
import {
  SidebarItemsCompany,
  SidebarItemsManager,
  SidebarItemsUser,
} from '../../constansts/sidebar-items';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  userType: string = localStorage.getItem('userType');
  constructor() {}

  get sidebarItems() {
    if (this.userType == UserType.Manager) {
      return SidebarItemsManager;
    }
    return SidebarItemsCompany;
  }

  ngOnInit(): void {}
}
