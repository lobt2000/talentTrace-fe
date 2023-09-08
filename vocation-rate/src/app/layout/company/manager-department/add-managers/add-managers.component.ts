import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { PermissionsModalComponent } from 'src/app/shared/components/modals/permissions-modal/permissions-modal.component';
import { ColumnModel } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-add-managers',
  templateUrl: './add-managers.component.html',
  styleUrls: ['./add-managers.component.scss'],
})
export class AddManagersComponent implements OnInit {
  form: FormGroup;
  creationType: string = 'uploading';
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
      permission: [],
    },
  ];
  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private route: ActivatedRoute,
    private _dialog: MatDialog,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this.creationType = this.route.snapshot.queryParams['type'];

    if (this.creationType == 'manually') {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        position: new FormControl('', [Validators.required]),
        permissions: new FormControl('', [Validators.required]),
      });

      this.openPermissionsModal();
    }

    this.breadcrumbsService.addBreadcrumbs({
      label: 'Creation',
      value: 'creation',
    });
  }

  openPermissionsModal() {
    this.dialogRef.closeAll();
    this._dialog
      .open(PermissionsModalComponent, {
        width: '60vw',
        height: '600px',
        position: {
          left: 'calc(50% - 20vw)',
        },
        data: {
          permissions: [],
        },
      })
      .afterClosed()
      .subscribe((res) => {
        // if (res == 'exit') {
        // this.onClose();
        // }
      });
  }
}
