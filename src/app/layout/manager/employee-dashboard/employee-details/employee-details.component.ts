import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { LoadingService } from 'src/app/service/loading.service';
import { IBreadcrumb } from 'src/app/shared/interfaces/ui-breadcrumbs.interface';
import { EmployeeDashboardService } from '../services/employee-dashboard.service';
import { ManagerDepartmentService } from 'src/app/layout/company/manager-department/services/manager-department.service';
import { Subject, filter, of, takeUntil, tap } from 'rxjs';
import { EventType, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  @Input() id = '';
  defaultBreadcrumb: IBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/manager/employee-dashboard',
  };
  select: number = 0;

  employee;
  managers;

  private destroy$ = new Subject();

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private loadingService: LoadingService,
    private employeeService: EmployeeDashboardService,
    private managersService: ManagerDepartmentService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.getEmployee();
    this.route.events
      .pipe(
        filter((res) => res.type === EventType.NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((res) => {
        if (!res['url'].includes('perfomance')) {
          if (this.breadcrumbsService.getBreadcrumbs.length > 2) {
            console.log('here');

            this.breadcrumbsService.removeActiveBreadcrumb();
          }
          this.select = 1;
        }
      });
  }

  getEmployee() {
    this.loadingService.setLoading(true);
    this.employeeService
      .getEmployee(this.id)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.managersService
            .getAllManagers()
            .subscribe((res) => (this.managers = res.data));
        }),
      )
      .subscribe((res) => {
        this.breadcrumbsService.removeActiveBreadcrumb();
        this.employee = res.data;
        this.breadcrumbsService.addBreadcrumbs({
          label: this.employee['name'],
          value: this.id,
          link: `/manager/employee-dashboard/${this.id}`,
        });
        this.loadingService.setLoading(false);
      });
  }

  get selectNotANull() {
    return typeof this.select !== 'undefined';
  }

  get title() {
    return this.employee?.name ?? '';
  }

  get isAvailableUpdate() {
    return this.employee?.hr === this.employeeService.currUser.name;
  }

  get isPerfomance() {
    return this.route.url.includes('perfomance');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
