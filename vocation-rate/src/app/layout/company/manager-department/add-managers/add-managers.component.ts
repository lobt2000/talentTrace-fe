import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
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
  constructor(private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.breadcrumbsService.addBreadcrumbs({
      label: 'Creation',
      value: 'creation',
    });
  }
}
