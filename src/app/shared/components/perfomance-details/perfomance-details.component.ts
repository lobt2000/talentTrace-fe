import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { ICommon } from '../../interfaces/common/common.interface';
import { MatIconModule } from '@angular/material/icon';
import { PageActions } from '../../constansts/page-actions.model';
import { EmployeeDashboardService } from 'src/app/layout/manager/employee-dashboard/services/employee-dashboard.service';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';
import { PermissionService } from 'src/app/service/permission.service';
import { LoadingService } from 'src/app/service/loading.service';
import { UiProgressComponent } from '../ui/ui-progress/ui-progress.component';
import { UiAutocompleteComponent } from '../ui/ui-autocomplete/ui-autocomplete.component';
import { MatInputModule } from '@angular/material/input';
import { EnglishFeedbackComponent } from './english-feedback/english-feedback.component';
import { GeneralFeedbackComponent } from './general-feedback/general-feedback.component';
import { TechFeedbackComponent } from './tech-feedback/tech-feedback.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUrls } from '../../constansts/common/common.constants';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-perfomance-details',
  templateUrl: './perfomance-details.component.html',
  styleUrls: ['./perfomance-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    UiProgressComponent,
    UiAutocompleteComponent,
    MatInputModule,
    EnglishFeedbackComponent,
    GeneralFeedbackComponent,
    TechFeedbackComponent,
    GeneralFeedbackComponent,
    PdfViewerModule,
  ],
})
export class PerfomanceDetailsComponent implements OnInit, OnDestroy {
  @Input() id = '';
  @Input() idem;

  defaultFeedbackStage: Array<any> = [
    {
      id: 0,
      name: 'General Feedback',
      type: 'HR',
    },
    {
      id: 1,
      name: 'English Feedback',
      type: 'ENGLISH',
    },
    {
      id: 2,
      name: 'Tech Feedback',
      type: 'TECH',
    },
    {
      id: 3,
      name: 'Evidence Feedback',
      type: 'EVIDENCE',
    },
  ];

  employee_details;
  employee_id: string;
  feedbacks: Array<any> = [];
  perfomance;

  select: number = 0;

  feedbackStageControl: UntypedFormControl = this.fb.control(null, [
    Validators.required,
  ]);
  titleControl: UntypedFormControl = this.fb.control(null, [
    Validators.required,
  ]);

  editMode: Array<boolean> = [];

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeDashboardService,
    private breadcrumbsService: BreadcrumbsService,
    private permissionService: PermissionService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.employee_id = this.route.snapshot.parent.params['id'];
    if (this.id !== PageActions.CREATION) {
      this.getFeedbacks();
      return;
    }

    this.setBreadCrumbs(this.id);
  }

  getFeedbacks() {
    this.loadingService.setLoading(true);
    this.employeeService
      .getAllFeedBacks(this.employee_id, this.id)
      .pipe(
        takeUntil(this.destroy$),
        tap((res) => {
          this.perfomance = res.data;
          this.titleControl.setValue(res.data.name);
          // this.breadcrumbsService.removeActiveBreadcrumb();
          this.feedbacks = this.perfomance.feedbacks.map((res) => {
            this.defaultFeedbackStage = this.defaultFeedbackStage.filter(
              (el) => el?.id !== res?.id,
            );
            return {
              ...res,
              editMode: false,
            };
          });
        }),
      )
      .subscribe(() => {
        this.setBreadCrumbs(this.perfomance.name);
        this.loadingService.setLoading(false);
      });
  }

  addFeedbackStage() {
    if (this.feedbackStageControl.invalid) return;
    const feedback = this.feedbackStageControl.value;
    this.feedbacks.push({
      ...this.feedbackStageControl.value,
      scores: [],
      file: {},
      ...(!this.isCreation && { editMode: true }),
    });
    this.defaultFeedbackStage = this.defaultFeedbackStage.filter(
      (el) => el?.id !== feedback?.id,
    );
    this.select = this.feedbacks.length - 1;
    this.feedbackStageControl.reset();
  }

  removeFeedback(feedback) {
    this.employeeService
      .onDelete('Are you sure you want to delete this feedback stage')
      .pipe(filter((el) => !!el))
      .subscribe((res) => {
        this.defaultFeedbackStage.push(feedback);
        this.defaultFeedbackStage = this.defaultFeedbackStage.sort(
          (a, b) => a.id - b.id,
        );
        this.feedbacks = this.feedbacks.filter((el) => el.id !== feedback.id);
        if (!this.isCreation) {
          this.onUpdate();
        }
      });
  }

  resetFeedback(i: number) {
    this.feedbacks[i] = { ...this.feedbacks[i], editMode: false };
  }

  onCreate() {
    if (!this.feedbacks.length || this.titleControl.invalid) {
      this.employeeService.openErrorModal('Title and one stage is required');
      return;
    }
    this.loadingService.setLoading(true);
    const transformFeedbacks: Array<any> = this.feedbacks.map((res) => {
      return 'data' in res.file
        ? {
            ...res,
            file: { id: uuidv4() },
          }
        : res;
    });
    const body = {
      name: this.titleControl.getRawValue(),
      feedbacks: transformFeedbacks,
    };
    this.employeeService
      .createEmployeePerfomace(this.employee_id, body)
      .pipe(
        takeUntil(this.destroy$),
        tap((perfomance) => {
          this.feedbacks.forEach((res, i) => {
            if ('data' in res.file) {
              const formData = new FormData();
              const body = {
                id: transformFeedbacks[i].file.id,
                data: res.file.data,
                perfomanceId: perfomance.data.id,
              };
              formData.append('file', JSON.stringify(body));
              this.employeeService
                .uploadFileForPerfomance(this.employee_id, formData)
                .subscribe();
            }
          });
        }),
      )
      .subscribe((res) => {
        const router = [
          CommonUrls.Manager,
          'employee-dashboard',
          this.employee_id,
          'perfomance',
          res.data.id,
        ];
        this.router.navigate(router);
        this.loadingService.setLoading(false);
        window.location.reload();
      });
  }

  onUpdateFeedback(feedback) {
    this.feedbacks.forEach((el) => {
      if (el.id == feedback.id) {
        el = feedback;
      }
    });
  }

  setBreadCrumbs(value) {
    setTimeout(() => {
      this.breadcrumbsService.addBreadcrumbs({
        label: value,
        value: value,
        link: `/manager/employee-dashboard/${this.employee_id}/perfomance/${value}`,
      });
    }, 1000);
  }

  onEditFeedback(index: number) {
    if (!this.feedbacks.length || this.titleControl.invalid)
      return this.employeeService.openErrorModal(
        'Title and one stage is required',
      );

    this.loadingService.setLoading(true);
    const feedback = this.feedbacks[index];
    if (feedback.type === 'TECH') {
      if (
        typeof feedback.file === 'undefined' ||
        !(feedback?.file && 'data' in feedback?.file)
      )
        return this.employeeService
          .openErrorModal('Title and one stage is required')
          .subscribe(() => this.loadingService.setLoading(false));

      const formData = new FormData();
      const body = {
        id: feedback.file.id || uuidv4(),
        data: feedback.file.data,
        perfomanceId: this.id,
      };
      formData.append('file', JSON.stringify(body));
      if (feedback.file.id) {
        this.employeeService
          .updateFileForPerfomance(feedback.file.id, formData)
          .subscribe();
      } else {
        feedback.file.id = body.id;
        this.employeeService
          .uploadFileForPerfomance(this.employee_id, formData)
          .subscribe();
      }
    }
    if (feedback.type === 'HR') {
      if (typeof feedback.file === 'undefined' || !('data' in feedback?.file))
        return this.employeeService
          .openErrorModal('Title and one stage is required')
          .subscribe(() => this.loadingService.setLoading(false));
      const formData = new FormData();
      const body = {
        data: feedback.file.data,
      };
      formData.append('file', JSON.stringify(body));
      this.employeeService
        .updateFileForPerfomance(feedback.file.id, formData)
        .subscribe();

      feedback.editMode = false;
      this.loadingService.setLoading(false);

      return;
    }

    this.onUpdate(feedback);
  }

  onUpdate(feedback?) {
    const body = {
      name: this.titleControl.getRawValue(),
      feedbacks: this.feedbacks.map((res) => {
        if (typeof res.file !== 'undefined' && 'data' in res.file)
          delete res.file.data;
        return res;
      }),
    };

    this.employeeService
      .updateEmployeePerfomace(this.employee_id, this.id, body)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (feedback ? (feedback.editMode = false) : '')),
      )
      .subscribe((res) => this.loadingService.setLoading(false));
  }

  get selectNotANull() {
    return typeof this.select !== 'undefined';
  }

  get isCreation(): boolean {
    return this.id === PageActions.CREATION;
  }

  get isAvailableUpdating() {
    // return this.permissionService.canUpdateInterviewStage(
    //   this.employee_details?.managers_team ?? []
    // );
    return true;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
