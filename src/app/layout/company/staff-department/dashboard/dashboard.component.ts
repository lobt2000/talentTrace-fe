import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';
import { StaffDepartmentService } from '../services/staff-department.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  employees_list: any[] = [];

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private staffDepartmentService: StaffDepartmentService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
    this.getAllEmployees();
  }

  onGoToItem(item) {
    this.router.navigate(
      [CommonUrls.Company, 'company-members', 'add-manually'],
      { queryParams: { actionType: 'editing', id: item.id } },
    );
  }

  addMembers(type: string) {
    this.router.navigate(
      [CommonUrls.Company, 'company-members', `add-${type}`],
      { queryParams: { actionType: 'creation' } },
    );
  }

  getAllEmployees() {
    this.loadingService.setLoading(true);
    this.staffDepartmentService.getAllEmployees().subscribe((res: any) => {
      this.employees_list = res.data;
      this.loadingService.setLoading(false);
    });
  }
}
