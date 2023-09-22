import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { ColumnModel } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-uploading-addition',
  templateUrl: './uploading-addition.component.html',
  styleUrls: ['./uploading-addition.component.scss'],
})
export class UploadingAdditionComponent implements OnInit {
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
  ];
  parsedDataArray: any[] = [
    {
      name: 'Jone Diggle',
      email: 'helowor@emai.com',
      position: 'hr manager',
      createDate: '12.01.2001',
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
    private route: ActivatedRoute
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
}
