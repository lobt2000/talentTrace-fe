import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';
import { GoogleMapsModalComponent } from 'src/app/shared/components/modals/google-maps-modal/google-maps-modal.component';
import { PageActions } from 'src/app/shared/constansts/page-actions.model';
import { IBreadcrumb } from 'src/app/shared/interfaces/ui-breadcrumbs.interface';
import { VacancyDashboardService } from '../services/vacancy-dashboard.service';
import { IRequest } from 'src/app/shared/interfaces/common/common.interface';
import { LoadingService } from 'src/app/service/loading.service';
import { Subject, filter, of, switchMap, takeUntil } from 'rxjs';
import { CandidatesService } from '../../candidates/services/candidates.service';

@Component({
  selector: 'app-vacancy-details',
  templateUrl: './vacancy-details.component.html',
  styleUrls: ['./vacancy-details.component.scss'],
})
export class VacancyDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() id = '';
  @ViewChild('stepper') stepper: MatStepper;
  defaultBreadcrumb: IBreadcrumb = {
    label: 'Dashboard',
    value: 'dashboard',
    link: '/manager/vacancy-dashboard',
  };
  select: number = null;

  managers: Array<any> = [];

  vacancy_form: UntypedFormGroup;
  vacancy_details = {};

  destroy$ = new Subject();

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private dialog: MatDialog,
    private vacancyService: VacancyDashboardService,
    private candidateService: CandidatesService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.initPage();
  }

  initPage(id?: string) {
    if (id) this.id = id;
    this.setActiveBreadCrumbs(this.id);
    if (!this.isCreation) this.getVacancyDetails();
    else {
      const user = JSON.parse(localStorage.getItem('userData'));
      this.vacancy_details['managers'] = [user];
    }

    this.getAllManagers();
  }

  setActiveBreadCrumbs(name) {
    this.breadcrumbsService.removeActiveBreadcrumb();
    this.breadcrumbsService.addBreadcrumbs({
      label: name,
      value: this.id,
      link: `/manager/vacancy-dashboard/${this.id}`,
    });
  }

  getVacancyDetails() {
    this.vacancyService
      .onGetVacancyDetails(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: IRequest) => {
        this.vacancy_details = res.data;
        this.setActiveBreadCrumbs(this.vacancy_details['name']);
      });
  }

  getAllManagers() {
    this.loadingService.setLoading(true);
    this.vacancyService
      .onGetAllManagers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: IRequest) => {
        this.managers = res.data;
        this.loadingService.setLoading(false);
      });
  }

  ngAfterViewInit(): void {
    this.stepper.selectedIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((el) => {
        this.select = el;
      });
    this.stepper.selectedIndex = 1;
  }

  onGoToItem(item) {
    this.breadcrumbsService.addBreadcrumbs({
      label: item.name,
      value: item,
      link: `/manager/vacancy-dashboard/${this.id}/${item.name}`,
    });
    this.navigateToItem(item.name);
  }

  onChangeFormValue(val) {
    this.vacancy_form = val;
  }

  onSave() {
    if (
      !this.vacancy_form?.valid ||
      !this.vacancy_details['managers']?.length
    ) {
      this.openErrorModal(
        'Vacancy form is invalid OR you don`t add any manager to hiring team',
      );
      return;
    }
    const body = {
      ...this.vacancy_form.getRawValue(),
      managers: this.vacancy_details['managers']?.map((el) => el.id),
    };

    this.loadingService.setLoading(true);
    this.vacancyService
      .onCreateVacancy(body)
      .pipe(
        takeUntil(this.destroy$),
        switchMap((res) => {
          if (this.vacancy_details['candidates']?.length) {
            this.candidateService
              .updateAllCandidates(res.data.id, {
                candidates: this.vacancy_details['candidates'],
              })
              .subscribe();
          }
          return of(res);
        }),
      )
      .subscribe((res) => {
        this.navigateToItem(res.data.id);
        this.loadingService.setLoading(false);
        this.initPage(res.data.id);
      });
  }

  onEditForm(form) {
    if (!form?.valid) {
      this.openErrorModal('Vacancy form is invalid ');
      return;
    }

    this.loadingService.setLoading(true);
    this.vacancyService
      .onUpdateVacancy(this.id, {
        ...this.vacancy_details,
        ...form.getRawValue(),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadingService.setLoading(false);
        form.disable();
      });
  }

  onDelete() {
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
          text: 'Are you sure you want to delete this vacancy?',
          title: 'Confirmation',
        },
      })
      .afterClosed()
      .pipe(
        filter((res) => !!res),
        switchMap((el) => {
          this.loadingService.setLoading(true);
          return this.vacancyService.onDeleteVacancy(
            this.vacancy_details['id'],
          );
        }),
      )
      .subscribe((res) => {
        this.loadingService.setLoading(false);
        this.navigateToItem();
      });
  }

  navigateToItem(route?) {
    this.vacancyService.navigateToItem(route);
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

  get title(): string {
    return this.id == PageActions.CREATION
      ? this.id
      : this.vacancy_details['name'];
  }

  get selectNotANull() {
    return typeof this.select !== 'undefined';
  }

  get isCreation(): boolean {
    return this.id == PageActions.CREATION;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
