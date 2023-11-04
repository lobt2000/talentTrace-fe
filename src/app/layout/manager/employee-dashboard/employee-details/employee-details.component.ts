import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { IBreadcrumb } from 'src/app/shared/interfaces/ui-breadcrumbs.interface';

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

  constructor(private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {
    this.breadcrumbsService.addBreadcrumbs({
      label: this.id,
      value: this.id,
      link: `/manager/employee-dashboard/${this.id}`,
    });
  }

  ngAfterViewInit(): void {
    this.stepper.selectedIndexChange.subscribe((el) => {
      console.log(el);

      this.select = el;
    });
  }

  get selectNotANull() {
    return typeof this.select !== 'undefined';
  }
}
