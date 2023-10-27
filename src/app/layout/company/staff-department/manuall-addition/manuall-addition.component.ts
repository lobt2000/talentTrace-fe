import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { IMember } from 'src/app/shared/interfaces/members.interface';

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
  currManager: IMember;
  constructor(
    private route: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
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
    };

    this.form.patchValue({
      ...this.currManager,
    });
  }
}
