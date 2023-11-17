import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { LoadingService } from 'src/app/service/loading.service';
import { IBreadcrumb } from 'src/app/shared/interfaces/ui-breadcrumbs.interface';
import { EmployeeDashboardService } from '../services/employee-dashboard.service';
import { ManagerDepartmentService } from 'src/app/layout/company/manager-department/services/manager-department.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {
  @Input() id = '';
  @ViewChild('stepper') stepper: MatStepper;
  defaultBreadcrumb: IBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/manager/employee-dashboard',
  };
  select: number = 0;

  employee;
  managers;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private loadingService: LoadingService,
    private employeeService: EmployeeDashboardService,
    private managersService: ManagerDepartmentService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.loadingService.setLoading(true);
    this.employeeService
      .getEmployee(this.id)
      .pipe(
        tap(() => {
          this.managersService
            .getAllManagers()
            .subscribe((res) => (this.managers = res.data));
        }),
      )
      .subscribe((res) => {
        this.employee = res.data;
        this.breadcrumbsService.addBreadcrumbs({
          label: this.employee['name'],
          value: this.id,
          link: `/manager/employee-dashboard/${this.id}`,
        });
        this.loadingService.setLoading(false);
      });
  }

  ngAfterViewInit(): void {
    console.log('here1');

    this.stepper.selectedIndexChange.subscribe((el) => {
      console.log('here2');

      this.select = el;
      if (this.breadcrumbsService.getBreadcrumbs.length > 2) {
        this.breadcrumbsService.removeActiveBreadcrumb();
      }
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
}
