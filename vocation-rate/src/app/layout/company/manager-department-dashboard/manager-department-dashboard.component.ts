import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';

@Component({
  selector: 'app-manager-department-dashboard',
  templateUrl: './manager-department-dashboard.component.html',
  styleUrls: ['./manager-department-dashboard.component.scss'],
})
export class ManagerDepartmentDashboardComponent implements OnInit {
  defaultBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/company/manager-department-dashboard',
  };

  constructor() {}

  ngOnInit(): void {}
}
