import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiPageComponent } from '../ui-page/ui-page.component';
import { SharedModule } from '../../shared.module';
import { IBreadcrumb } from '../../interfaces/ui-breadcrumbs.interface';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/service/loading.service';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { PageActions } from '../../constansts/page-actions.model';
import { InteviewingStageComponent } from './inteviewing-stage/inteviewing-stage.component';

@Component({
  selector: 'app-candidate-details',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatStepperModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CandidateProfileComponent,
    InteviewingStageComponent,
  ],
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss'],
})
export class CandidateDetailsComponent implements OnInit {
  @Input() id = '';
  defaultBreadcrumb: IBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/manager/candidates',
  };
  select: number = 0;

  currVacancy = {
    name: 'Middle Front-End Angular Developer',
    employment: 'Remote',
    country: 'Ukraine',
    city: 'Lviv',
    active: true,
    manager: {
      name: 'Jona Mickle',
      icon: 'assets/img/logo2.0.png',
    },
    candidates: [
      {
        name: 'Josef Monit',

        image: 'assets/img/images.jpeg',
      },
      {
        name: 'Rober Nodur',
        image: 'assets/img/logo2.0.png',
      },
    ],
  };

  managers: Array<any> = [];

  candidate_form: UntypedFormGroup;
  candidate_details = {};

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.breadcrumbsService.addBreadcrumbs({
      label:
        this.id == PageActions.CREATION
          ? this.id
          : this.candidate_details['name'],
      value: this.id,
      link: `/manager/candidates/${this.id}`,
    });
  }

  onDelete() {}

  onSave() {}

  get isCreation(): boolean {
    return this.id === PageActions.CREATION;
  }

  get title(): string {
    return this.id == PageActions.CREATION
      ? this.id
      : this.candidate_details['name'];
  }
}
