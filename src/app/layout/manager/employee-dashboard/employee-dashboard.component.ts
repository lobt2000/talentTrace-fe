import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { EmployeeDashboardService } from './services/employee-dashboard.service';
import { LoadingService } from 'src/app/service/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnDestroy {
  employee_list: any[];
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
      field: 'fullPosition',
    },
    {
      value: 4,
      label: 'Creation date',
      field: 'startDate',
    },
  ];

  destroy$ = new Subject();

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeDashboardService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.removeActiveBreadcrumb();
    this.getEmployees();
  }

  getEmployees() {
    this.loadingService.setLoading(true);
    this.employeeService
      .getAllEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.employee_list = res.data;
        this.loadingService.setLoading(false);
      });
  }

  onGoToItem(item) {
    this.router.navigate([item.id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
