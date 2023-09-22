import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { PermissionService } from 'src/app/service/permission.service';
import { PermissionsModalComponent } from 'src/app/shared/components/modals/permissions-modal/permissions-modal.component';
import { ColumnModel } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-addition-by-uploading',
  templateUrl: './addition-by-uploading.component.html',
  styleUrls: ['./addition-by-uploading.component.scss'],
})
export class AdditionByUploadingComponent implements OnInit {
  columns: ColumnModel[] = [
    {
      value: 1,
      label: 'Manager name',
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
  parsedDataArray: any[] = [
    {
      name: 'Jone Diggle',
      email: 'helowor@emai.com',
      position: 'hr manager',
      createDate: '12.01.2001',
      permission: {},
      id: 1,
    },
  ];
  defaultQueryParams = {
    actionType: 'creation',
    creationType: 'uploading',
    id: null,
  };
  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private _dialog: MatDialog,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.defaultQueryParams = {
      actionType: this.route.snapshot.queryParams['actionType'] || 'creation',
      creationType: this.route.snapshot.queryParams['type'],
      id: this.route.snapshot.queryParams['id'],
    };

    this.breadcrumbsService.addBreadcrumbs({
      label:
        this.defaultQueryParams.actionType.charAt(0).toUpperCase() +
        this.defaultQueryParams.actionType.slice(1),
      value: this.defaultQueryParams.actionType,
    });
  }

  openPermissionsModal(elem) {
    console.log(elem);

    this.dialogRef.closeAll();
    this._dialog
      .open(PermissionsModalComponent, {
        width: '60vw',
        height: '600px',
        position: {
          left: 'calc(50% - 20vw)',
        },
        data: {
          permissions: elem.permission,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        const permissions = this.permissionService.getCorrectPermissions(res);
        this.parsedDataArray.find(
          (manager) => manager.id === elem.id
        ).permission = Object.values(permissions).length
          ? permissions
          : elem.permission;
      });
  }
}
