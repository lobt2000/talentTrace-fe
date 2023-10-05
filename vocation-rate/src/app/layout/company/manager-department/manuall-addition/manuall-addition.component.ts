import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { PermissionService } from 'src/app/service/permission.service';
import { PermissionsModalComponent } from 'src/app/shared/components/modals/permissions-modal/permissions-modal.component';
import { permissionsIds } from 'src/app/shared/constansts/permissions';
import { IManager } from 'src/app/shared/interfaces/managers.interface';

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
  currManager: IManager;
  constructor(
    private _dialog: MatDialog,
    private dialogRef: MatDialog,
    private route: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      permissions: new FormControl('', [Validators.required]),
    });

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
      this.getCurrentManager(this.defaultQueryParams.id);
    }
  }

  getCurrentManager(id) {
    this.currManager = {
      name: 'Middle Front-End Angular Developer',
      icon: 'assets/img/dev-company-logo.jpeg',
      active: true,
      id: 1,
      firstName: 'Mykola',
      lastName: 'Volos',
      email: 'adas@sdaf.com',
      position: 'Middle Front-End Angular Developer',
      permissions: {
        vacancies: [
          {
            name: 'Possibility to send a messages',
            id: 1,
            children: 0,
          },
          {
            name: 'Generating a link for the candidate',
            id: 2,
          },
          {
            name: 'Possibility to write comments for vacancy',
            id: 3,
          },
          {
            name: 'Possibility to manage vacancies',
            id: 4,
            children: [
              {
                id: 0,
              },
              {
                id: 1,
              },
              {
                id: 2,
              },
            ],
          },
        ],
      },
    };

    this.form.patchValue({
      ...this.currManager,
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
          permissions: this.form.get('permissions').value,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        const permissions = this.permissionService.getCorrectPermissions(res);
        this.form
          .get('permissions')
          .patchValue(Object.values(permissions).length ? permissions : null);
      });
  }
}
