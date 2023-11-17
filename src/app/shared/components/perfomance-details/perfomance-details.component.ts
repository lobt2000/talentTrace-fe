import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
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
import { filter } from 'rxjs';
import { BreadcrumbsService } from 'src/app/service/breadcrumbs.service';

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
  ],
})
export class PerfomanceDetailsComponent implements OnInit, AfterViewInit {
  @Input() id = '';
  @ViewChild('stepper') stepper: MatStepper;

  defaultFeedbackStage: Array<any> = [
    {
      id: 0,
      name: 'Hr Feedback',
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

  feedbacks: Array<any> = [];

  feedbackStageControl: UntypedFormControl = this.fb.control(null);
  select: number = 0;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeDashboardService,
    private breadcrumbsService: BreadcrumbsService,
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.breadcrumbsService.addBreadcrumbs({
        label: this.id,
        value: this.id,
        link: '/manager/employee-dashboard',
      });
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.stepper?.selectedIndexChange?.subscribe((el) => {
      this.select = el;
    });
  }

  addFeedbackStage() {
    if (this.feedbackStageControl.invalid) return;
    const feedback = this.feedbackStageControl.value;
    this.feedbacks.push(this.feedbackStageControl.value);
    this.defaultFeedbackStage = this.defaultFeedbackStage.filter(
      (el) => el.id !== feedback.id,
    );
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
      });
  }

  get selectNotANull() {
    return typeof this.select !== 'undefined';
  }

  get isCreation(): boolean {
    return this.id === PageActions.CREATION;
  }
}
