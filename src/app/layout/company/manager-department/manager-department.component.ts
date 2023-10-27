import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-department',
  templateUrl: './manager-department.component.html',
  styleUrls: ['./manager-department.component.scss'],
})
export class ManagerDepartmentComponent implements OnInit {
  defaultBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/company/manager-department',
  };

  constructor() {}

  ngOnInit(): void {}
}
