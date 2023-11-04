import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';
import { IMember } from 'src/app/shared/interfaces/members.interface';
import { StaffDepartmentService } from '../services/staff-department.service';
import { IRequest } from 'src/app/shared/interfaces/common/common.interface';

@Component({
  selector: 'app-manuall-addition',
  templateUrl: './manuall-addition.component.html',
  styleUrls: ['./manuall-addition.component.scss'],
})
export class ManuallAdditionComponent implements OnInit {
  employeeForm: FormGroup;
  defaultQueryParams = {
    actionType: 'creation',
    id: null,
  };
  currEmployee;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
    private loadingService: LoadingService,
    private _dialog: MatDialog,
    private dialogRef: MatDialog,
    private staffDepartmentService: StaffDepartmentService,
  ) {}

  ngOnInit(): void {}

  initPage() {
    this.defaultQueryParams = {
      actionType: this.route.snapshot.queryParams['actionType'] || 'creation',
      id: this.route.snapshot.queryParams['id'],
    };

    this.breadcrumbsService.addBreadcrumbs({
      label:
        this.defaultQueryParams.actionType.charAt(0).toUpperCase() +
        this.defaultQueryParams.actionType.slice(1),
      value: this.defaultQueryParams.actionType,
    });

    if (this.defaultQueryParams.id) {
      this.getCurrentEmployee(this.defaultQueryParams.id);
    }
  }

  getCurrentEmployee(id) {
    this.loadingService.setLoading(true);
    this.staffDepartmentService.getEmployee(id).subscribe((res: IRequest) => {
      this.currEmployee = res.data.user;
      this.loadingService.setLoading(false);
    });
  }

  onUpdateFormValue(val) {
    this.employeeForm = val;
  }

  onSubmit() {
    if (!this.employeeForm.valid) return;
    const body = {
      ...this.employeeForm.getRawValue(),
    };

    this.loadingService.setLoading(true);
    const apiRequest = this.currEmployee?._id
      ? this.staffDepartmentService.updateEmployee(this.currEmployee._id, body)
      : this.staffDepartmentService.createEmployee(body);

    apiRequest.subscribe((res: { status: string; data: any }) => {
      this.currEmployee = res.data.user;
      const notifficationId =
        this.route.snapshot.queryParams['notifficationId'];

      this.router.navigate(
        [CommonUrls.Company, 'manager-department', 'add-manually'],
        { queryParams: { actionType: 'editing', id: res.data.id } },
      );
      this.initPage();
    });
  }

  onDelete() {
    this._dialog.closeAll();
    this._dialog
      .open(ConfirmationModalComponent, {
        width: '40vw',
        height: '300px',
        position: {
          left: 'calc(50% - 15vw)',
        },
        panelClass: 'confirmation-modal',
        data: {
          text: 'Are you sure you want to delete this manager?',
          title: 'Confirmation',
        },
      })
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        switchMap((el) => {
          this.loadingService.setLoading(true);
          return this.staffDepartmentService.deleteEmployee(
            this.currEmployee.id,
          );
        }),
      )
      .subscribe((res) => {
        this.loadingService.setLoading(false);
        this.router.navigate([CommonUrls.Company, 'manager-department']);
      });
  }

  changeScrean() {
    this.defaultQueryParams.actionType = 'creation';
  }

  get isCreationScrean() {
    return this.defaultQueryParams.actionType === 'creation';
  }
}
