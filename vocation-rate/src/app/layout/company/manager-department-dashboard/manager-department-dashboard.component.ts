import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-department-dashboard',
  templateUrl: './manager-department-dashboard.component.html',
  styleUrls: ['./manager-department-dashboard.component.scss'],
})
export class ManagerDepartmentDashboardComponent implements OnInit {
  managers_list: any[] = [
    {
      name: 'Middle Front-End Angular Developer',
      icon: 'assets/img/dev-company-logo.jpeg',
      active: true,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
