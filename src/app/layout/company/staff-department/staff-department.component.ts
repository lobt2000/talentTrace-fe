import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-department',
  templateUrl: './staff-department.component.html',
  styleUrls: ['./staff-department.component.scss'],
})
export class StaffDepartmentComponent implements OnInit {
  defaultBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/company/company-members',
  };

  constructor() {}

  ngOnInit(): void {}
}
