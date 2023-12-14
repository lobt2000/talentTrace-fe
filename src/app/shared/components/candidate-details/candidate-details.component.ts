import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { CandidatesService } from 'src/app/layout/manager/candidates/services/candidates.service';
import { CommonUrls } from '../../constansts/common/common.constants';
import { Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PermissionService } from 'src/app/service/permission.service';

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
    MatIconModule,
  ],
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss'],
})
export class CandidateDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() id = '';
  @ViewChild('stepper') stepper: MatStepper;

  defaultBreadcrumb: IBreadcrumb = {
    label: 'Candidates',
    value: 'candidates',
    link: '/manager/candidates',
  };
  select: number = 0;

  managers: Array<any> = [];

  candidate_form: UntypedFormGroup;
  candidate_details = {};
  stages: any[];

  destroy$ = new Subject();
  firstInit: boolean = true;

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private candidatesService: CandidatesService,
    private permissionService: PermissionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initPage();
  }

  ngAfterViewInit(): void {
    this.stepper.selectedIndexChange.subscribe((el) => {
      this.select = el;

      if (typeof el === 'number' && el === 1 && this.firstInit) {
        this.getInterviewStages();
        this.firstInit = false;
      }
    });
    this.stepper.selectedIndex = 0;
  }

  initPage(id?) {
    if (id) this.id = id;

    this.setActiveBreadcrumbs(this.id);
    if (!this.isCreation) {
      this.getCandidate();
    }
  }

  getCandidate() {
    this.loadingService.setLoading(true);
    this.candidatesService
      .getCandidate(this.id, 'form')
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.candidate_details = res.data;
        this.setActiveBreadcrumbs(this.candidate_details['name']);
        setTimeout(() => {
          this.loadingService.setLoading(false);
        }, 1000);
      });
  }

  getInterviewStages() {
    this.loadingService.setLoading(true);
    this.candidatesService
      .getCandidate(this.id, 'stages')
      .pipe(
        takeUntil(this.destroy$),
        tap((el) => {
          if (el.status) this.loadingService.setLoading(false);
        }),
      )
      .subscribe((res) => {
        this.stages = res.data.stages;
        if (res.status) this.loadingService.setLoading(false);
      });
  }

  setActiveBreadcrumbs(name) {
    this.breadcrumbsService.removeActiveBreadcrumb();
    this.breadcrumbsService.addBreadcrumbs({
      label: name,
      value: this.id,
      link: `/manager/candidates/${this.id}`,
    });
  }

  onDelete() {
    this.dialog.closeAll();
    this.candidatesService
      .onDelete()
      .pipe(
        filter((res) => !!res),
        switchMap((el) => {
          this.loadingService.setLoading(true);
          return this.candidatesService.deleteCandidate(
            this.candidate_details['id'],
          );
        }),
      )
      .subscribe((res) => {
        this.loadingService.setLoading(false);
        const router = [CommonUrls.Manager, 'candidates'];
        this.router.navigate(router);
      });
  }

  onSave() {
    if (!this.candidate_form || this.candidate_form?.invalid) {
      this.openErrorModal('Cabdidate form is invalid ');
      return;
    }

    this.loadingService.setLoading(true);
    this.candidatesService
      .createCandidate(this.getFormBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const router = [CommonUrls.Manager, 'candidates', res.data.id];
        this.router.navigate(router);
        this.loadingService.setLoading(false);
        this.initPage(res.data.id);
      });
  }

  onEditForm() {
    if (!this.candidate_form?.valid) {
      this.openErrorModal('Candidate form is invalid ');
      return;
    }
    this.onUpdateCandidate(this.getFormBody);
  }

  onEditStages() {
    this.onUpdateCandidate(this.getInterviewStagesBody);
  }

  openErrorModal(message) {
    this.dialog.closeAll();
    this.dialog
      .open(ConfirmationModalComponent, {
        width: '40vw',
        height: '300px',
        position: {
          left: 'calc(50% - 15vw)',
        },
        panelClass: 'confirmation-modal',
        data: {
          text: message,
          title: 'Error',
          withoutButtonCancel: true,
        },
      })
      .afterClosed()
      .subscribe();
  }

  updateCandidateForm(form) {
    this.candidate_form = form;
  }

  updateInterviewStages(stages) {
    this.stages = stages;
  }

  onUpdateCandidate(body) {
    this.loadingService.setLoading(true);
    this.candidatesService
      .updateCandidate(this.id, body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadingService.setLoading(false);
        if (this.select !== 1) {
          this.candidate_form.disable();
        } else {
          this.stages = [...this.stages];
        }
      });
  }

  resetFormChanges() {
    this.candidate_details = { ...this.candidate_details };
    this.candidate_form.disable();
  }

  get getFormBody() {
    const formData = new FormData();
    const icon =
      this.candidate_details['icon']?.data ===
      this.candidate_form.get('icon').value?.data;
    const body = {
      ...this.candidate_form?.getRawValue(),
      cv: {},
      icon: icon ? {} : this.candidate_form.get('icon').value.data,
    };

    if (
      this.candidate_form.value.cv.data !== this.candidate_details['cv']?.data
    ) {
      formData.append('data', this.candidate_form.get('cv').value.data);
    }
    delete body.cv.data;
    if (icon) delete body.icon;
    formData.append('candidate', JSON.stringify(body));

    return formData;
  }

  get getInterviewStagesBody() {
    const formData = new FormData();
    const body = { stages: this.stages };
    formData.append('candidate', JSON.stringify(body));

    return formData;
  }

  get isCreation(): boolean {
    return this.id === PageActions.CREATION;
  }

  get vacanciesIds(): Array<any> {
    return this.candidate_details['vacanciesIds'] ?? [];
  }

  get title(): string {
    return this.id == PageActions.CREATION
      ? this.id
      : this.candidate_details['name'];
  }

  get isAvailableUpdating() {
    return this.permissionService.getCanUpdateInterviewStageValue;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
