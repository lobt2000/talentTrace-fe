import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { PermissionService } from 'src/app/service/permission.service';
import { PermissionsModalComponent } from 'src/app/shared/components/modals/permissions-modal/permissions-modal.component';
import { permissionsIds } from 'src/app/shared/constansts/permissions';
import { IManager } from 'src/app/shared/interfaces/managers.interface';
import { ManagerDepartmentService } from '../services/manager-department.service';
import { filter, switchMap, tap } from 'rxjs';
import { CommonUrls } from 'src/app/shared/constansts/common/common.constants';
import { IRequest } from 'src/app/shared/interfaces/common/common.interface';
import { LoadingService } from 'src/app/service/loading.service';
import { GenerationUrlComponent } from 'src/app/shared/components/modals/generation-url/generation-url.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';
import { NotifficationService } from '../../notiffication/services/notiffication.service';

@Component({
  selector: 'app-manuall-addition',
  templateUrl: './manuall-addition.component.html',
  styleUrls: ['./manuall-addition.component.scss'],
})
export class ManuallAdditionComponent implements OnInit {
  form: FormGroup;
  defaultQueryParams = {
    actionType: 'creation',
    id: null,
  };
  currManager;
  managerForm;
  openUrlModal: boolean = true;
  constructor(
    private _dialog: MatDialog,
    private dialogRef: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbsService: BreadcrumbsService,
    private permissionService: PermissionService,
    private managerDepartmentService: ManagerDepartmentService,
    private loadingService: LoadingService,
    private notifficationService: NotifficationService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      permissions: new FormControl('', [Validators.required]),
    });
    this.initPage();
  }

  initPage() {
    this.defaultQueryParams = {
      actionType: this.route.snapshot.queryParams['actionType'] || 'creation',
      id: this.route.snapshot.queryParams['id'],
    };

    this.breadcrumbsService.removeActiveBreadcrumb();

    this.breadcrumbsService.addBreadcrumbs({
      label:
        this.defaultQueryParams.actionType.charAt(0).toUpperCase() +
        this.defaultQueryParams.actionType.slice(1),
      value: this.defaultQueryParams.actionType,
    });

    if (this.defaultQueryParams.id) {
      this.getCurrentManager(this.defaultQueryParams.id);
    }

    if (this.defaultQueryParams.id) this.openUrlModal = false;
  }

  getCurrentManager(id) {
    this.loadingService.setLoading(true);
    this.managerDepartmentService.getManager(id).subscribe((res: IRequest) => {
      this.currManager = res.data;
      this.loadingService.setLoading(false);
    });
  }

  onUpdateFormValue(val) {
    this.managerForm = val;
  }

  onSubmit() {
    if (!this.managerForm.valid) return;
    const body = {
      ...this.managerForm.getRawValue(),
    };

    this.loadingService.setLoading(true);
    const apiRequest = this.currManager?._id
      ? this.managerDepartmentService.updateManager(this.currManager._id, body)
      : this.managerDepartmentService.createManager(body);

    apiRequest.subscribe((res: { status: string; data: any }) => {
      this.currManager = 'id' in res.data ? this.currManager : res.data;
      const notifficationId =
        this.route.snapshot.queryParams['notifficationId'];

      if (notifficationId)
        this.notifficationService
          .declineNotiffication(notifficationId)
          .subscribe();

      this.router.navigate(
        [CommonUrls.Company, 'manager-department', 'add-manually'],
        { queryParams: { actionType: 'editing', id: res.data.id } },
      );

      if (this.openUrlModal) this.openGenerationUrl();
      this.loadingService.setLoading(false);
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
          return this.managerDepartmentService.deleteManager(
            this.currManager.id,
          );
        }),
      )
      .subscribe((res) => {
        this.loadingService.setLoading(false);
        this.router.navigate([CommonUrls.Company, 'manager-department']);
      });
  }

  // openPermissionsModal() {
  //   this.dialogRef.closeAll();
  //   this._dialog
  //     .open(PermissionsModalComponent, {
  //       width: '60vw',
  //       height: '600px',
  //       position: {
  //         left: 'calc(50% - 20vw)',
  //       },
  //       data: {
  //         permissions: this.form.get('permissions').value,
  //       },
  //     })
  //     .afterClosed()
  //     .subscribe((res) => {
  //       const permissions = this.permissionService.getCorrectPermissions(res);
  //       this.form
  //         .get('permissions')
  //         .patchValue(permissions && Object.values(permissions).length ? permissions : null);
  //     });
  // }

  openGenerationUrl() {
    this.dialogRef.closeAll();
    this._dialog
      .open(GenerationUrlComponent, {
        width: '40vw',
        height: '200px',
        position: {
          left: 'calc(50% - 15vw)',
        },
        data: {
          id: this.currManager._id,
        },
      })
      .afterClosed()
      .subscribe((res) => {});
  }

  changeScrean() {
    this.defaultQueryParams.actionType = 'creation';
  }

  get isCreationScrean() {
    return this.defaultQueryParams.actionType === 'creation';
  }
}
