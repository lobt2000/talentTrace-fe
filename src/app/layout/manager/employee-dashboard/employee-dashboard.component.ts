import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { ColumnModel } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent {
  employee_list: any[] = [
    {
      name: 'Middle Front-End Angular Developer',
      city: 'Lviv',
      active: true,
    },
    {
      name: 'Middle Front-End Angular Developer',
      city: 'Lviv',
      active: true,
    },
    {
      name: 'Middle Front-End Angular Developer',
      active: true,
      city: 'Lviv',
    },
  ];
  defaultBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/manager/employee-dashboard',
  };

  columns: ColumnModel[] = [
    {
      value: 1,
      label: 'Employee name',
      field: 'name',
    },
    {
      value: 2,
      label: 'Email',
      field: 'email',
    },
    {
      value: 3,
      label: 'Position',
      field: 'position',
    },
    {
      value: 4,
      label: 'Creation date',
      field: 'createDate',
    },
    {
      value: 5,
      label: 'Permissions',
      field: 'permission',
      hiddenSort: true,
    },
  ];

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
  }

  onGoToItem(item) {
    console.log(item);

    this.router.navigate([item.name], {
      relativeTo: this.route,
    });
  }
}
