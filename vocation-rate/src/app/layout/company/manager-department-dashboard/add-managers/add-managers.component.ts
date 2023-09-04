import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';

@Component({
  selector: 'app-add-managers',
  templateUrl: './add-managers.component.html',
  styleUrls: ['./add-managers.component.scss'],
})
export class AddManagersComponent implements OnInit {
  form: FormGroup;
  creationType: string = 'uploading'
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
