import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { ColumnModel } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-add-company-members',
  templateUrl: './add-company-members.component.html',
  styleUrls: ['./add-company-members.component.scss'],
})
export class AddCompanyMembersComponent implements OnInit {
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
  ];
  parsedDataArray: any[] = [
    {
      name: 'Jone Diggle',
      email: 'helowor@emai.com',
      position: 'hr manager',
      createDate: '12.01.2001',
    },
  ];
  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.creationType = this.route.snapshot.queryParams['type'];
    console.log(this.creationType, 'manually');
    
    if ((this.creationType == 'manually')) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
      });
    }

    this.breadcrumbsService.addBreadcrumbs({
      label: 'Creation',
      value: 'creation',
    });
  }
}
