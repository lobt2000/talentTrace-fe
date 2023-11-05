import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { LoadingService } from 'src/app/service/loading.service';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';
import { ManagerDepartmentService } from '../services/manager-department.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class: 'w-100',
  },
})
export class DashboardComponent implements OnInit {
  managers_list: any[] = [];

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private loadingService: LoadingService,
    private managersDepServices: ManagerDepartmentService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
    this.getAllManagers();
  }

  onGoToItem(item) {
    this.breadcrumbsService.addBreadcrumbs({
      label: item.name,
      value: item,
      link: `/company/manager-department`,
    });

    this.router.navigate(
      [CommonUrls.Company, 'manager-department', 'add-manually'],
      { queryParams: { actionType: 'editing', id: item.id } },
    );
  }

  addManagers(type: string) {
    this.router.navigate(
      [CommonUrls.Company, 'manager-department', `add-${type}`],
      { queryParams: { actionType: 'creation' } },
    );
  }

  getAllManagers() {
    this.loadingService.setLoading(true);
    this.managersDepServices.getAllManagers().subscribe((res: any) => {
      this.managers_list = res.data;
      this.loadingService.setLoading(false);
    });
  }
}
