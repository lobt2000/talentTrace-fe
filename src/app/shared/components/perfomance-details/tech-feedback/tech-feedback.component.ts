import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/service/loading.service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { UiAutocompleteComponent } from '../../ui/ui-autocomplete/ui-autocomplete.component';
import { UiProgressComponent } from '../../ui/ui-progress/ui-progress.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EmployeeDashboardService } from 'src/app/layout/manager/employee-dashboard/services/employee-dashboard.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { PageActions } from 'src/app/shared/constansts/page-actions.model';

@Component({
  selector: 'app-tech-feedback',
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
    MatTooltipModule,
    CKEditorModule,
  ],
  templateUrl: './tech-feedback.component.html',
  styleUrls: ['./tech-feedback.component.scss'],
  providers: [{ provide: 'ckeditor', useValue: ClassicEditor }],
})
export class TechFeedbackComponent implements OnInit, OnDestroy {
  @Input() feedback;
  @Input() id;
  @Output() updateFeedback: EventEmitter<any> = new EventEmitter();

  editor = ClassicEditor;

  addScoreForm = this.fb.group({
    type: this.fb.control('', [Validators.required]),
    value: this.fb.control('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
  });
  videoSource;

  isAddScoreAvailable: boolean = false;
  addScoreOptions: Array<any> = [];

  private destroy$ = new Subject();

  constructor(
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private employeeService: EmployeeDashboardService,
  ) {}

  ngOnInit(): void {
    console.log(this.isCreation);

    if (!this.isCreation && this.feedback.file && 'id' in this.feedback.file)
      this.getFile();
    this.getScoreOptions();
  }

  getScoreOptions() {
    this.employeeService
      .getAllScoreOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.addScoreOptions = res.data));
  }

  getFile() {
    this.loadingService.setLoading(true);
    this.employeeService
      .getPerfomanceFile(this.feedback?.file?.id)
      .pipe(
        takeUntil(this.destroy$),
        tap(
          (res) =>
            (this.feedback.file = {
              ...this.feedback.file,
              data: res.data.file.data,
            }),
        ),
      )
      .subscribe(() => this.loadingService.setLoading(false));
  }

  onAddScore(feedbacks) {
    this.addScoreForm.markAsTouched();
    if (this.addScoreForm.invalid) return;
    if (typeof this.addScoreForm.value.type === 'string') {
      let newScore = {
        name: this.addScoreForm.value.type,
        type: this.addScoreForm.value.type.toUpperCase().replace(' ', '_'),
      };
      this.loadingService.setLoading(true);
      this.employeeService
        .createScoreOption(newScore)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          newScore['id'] = res.data.scoreOptions.id;
          this.addScoreOptions.push(res.data.scoreOptions);
          this.loadingService.setLoading(false);
        });
      feedbacks['scores'].push({
        ...newScore,
        value: this.addScoreForm.value.value,
      });
    } else
      feedbacks['scores'].push({
        ...(this.addScoreForm.value.type as Object),
        value: this.addScoreForm.value.value,
      });

    feedbacks['averageLevel'] = this.calculateAverageLevel();
    this.addScoreForm.reset();
    console.log(feedbacks);

    this.updateFeedback.emit(this.feedback);
    this.isAddScoreAvailable = false;
  }

  onGetInterviewFile(event, feedback) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.loadingService.setLoading(true);
      reader.onload = (e) => {
        this.videoSource = e.target.result;
        feedback['file'] = {
          ...feedback['file'],
          data: e.target.result,
        };
        this.loadingService.setLoading(false);

        this.updateFeedback.emit(this.feedback);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onChange({ editor }) {
    this.feedback.textFeedback = editor.getData();
  }

  calculateAverageLevel() {
    const averageLevel = this.feedback.scores.reduce(
      (a, b) => Number(a.value ?? 0) + Number(b.value ?? 0),
    );
    return (
      (typeof averageLevel === 'number' ? averageLevel : averageLevel.value) /
      this.feedback.scores.length
    );
  }

  removeFile() {
    delete this.feedback.file.data;
  }

  get isCreation() {
    return PageActions.CREATION === this.id;
  }

  get isAvailableUpdating() {
    // return this.permissionService.canUpdateInterviewStage(
    //   this.employee_details?.managers_team ?? []
    // );
    return true;
  }

  get isAllowToChange() {
    return this.isCreation ? true : this.feedback.editMode;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
