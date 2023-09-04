import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  managers_list: any[] = [
    {
      name: 'Middle Front-End Angular Developer',
      icon: 'assets/img/dev-company-logo.jpeg',
      active: true,
    },
  ];

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
  }

  onGoToItem(item) {
    this.breadcrumbsService.addBreadcrumbs({
      label: item.name,
      value: item,
      link: `/company/manager-department-dashboard/${item.name}`,
    });
  }

  addManagers() {
    this.router.navigate([
      CommonUrls.Company,
      'manager-department-dashboard',
      'add-managers',
    ]);
  }
}
