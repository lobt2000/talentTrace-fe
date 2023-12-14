import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { UiAutocompleteComponent } from '../../ui/ui-autocomplete/ui-autocomplete.component';
import { UiCanvasProgressComponent } from '../../ui/ui-canvas-progress/ui-canvas-progress.component';
import { Subject, debounceTime, filter, takeUntil, takeWhile } from 'rxjs';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PageActions } from 'src/app/shared/constansts/page-actions.model';

@Component({
  selector: 'app-english-feedback',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    UiAutocompleteComponent,
    MatInputModule,
    UiCanvasProgressComponent,
    CKEditorModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  templateUrl: './english-feedback.component.html',
  styleUrls: ['./english-feedback.component.scss'],
  providers: [{ provide: 'ckeditor', useValue: ClassicEditor }],
})
export class EnglishFeedbackComponent implements OnInit, OnDestroy {
  @Input() feedback;
  @Input() id;
  @Output() updateFeedback: EventEmitter<any> = new EventEmitter();

  editor = ClassicEditor;

  addEnglishForm: UntypedFormGroup = this.fb.group({
    type: this.fb.control(null, [Validators.required]),
    correctPoints: this.fb.control(null),
    totalPoints: this.fb.control(null),
  });
  testTypeForm: UntypedFormGroup = this.fb.group({
    testTypeFormArray: this.fb.array([]),
  });
  speakLevelControl: UntypedFormControl = this.fb.control(null, [
    Validators.required,
  ]);

  defaultEnglishStage: Array<any> = [
    {
      id: 0,
      name: 'Speaking',
      type: 'SPEAK',
    },
    {
      id: 1,
      name: 'Use of English (Grammar & Vocabulary)',
      type: 'TEST',
    },
    {
      id: 2,
      name: 'Listening',
      type: 'TEST',
    },
    {
      id: 3,
      name: 'Reading',
      type: 'TEST',
    },
    {
      id: 4,
      name: 'Writing',
      type: 'TEST',
    },
  ];
  stylesProgress = {
    color: '#384a89',
    background: '#fff',
  };
  defaultEnglishTest: Array<any> = [
    {
      id: 0,
      name: 'A2-A2+',
      type: 'PREINTERMEDIATE',
    },
    {
      id: 1,
      name: 'B1-B1+',
      type: 'INTERMEDIATE',
    },
    {
      id: 2,
      name: 'B2-B2+',
      type: 'UPPER',
    },
    {
      id: 3,
      name: 'C1-C2',
      type: 'ADVANCE',
    },
    {
      id: 4,
      name: 'A2-C1',
      type: 'DEFAULT',
    },
  ];
  defaultEnglishLevels = Object.keys(EnglishLevels).filter((el) =>
    isNaN(Number(el)),
  );

  isAddStageAvailable: boolean = false;

  private destroy$ = new Subject();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.isCreation) this.initData();
    this.subscribeToAddEnglishChanges();
    this.subscribeToSpeakLevelChanges();
    this.subscribeToCorrectPoints();
  }

  initData() {
    this.feedback.scores?.forEach((res) => {
      if (res.type !== 'TEST') {
        this.speakLevelControl.patchValue(
          this.defaultEnglishLevels.find((el) => el === res.level),
        );
      }
      if (res.textFeedback) {
        res.textFeedback = res.textFeedback
          .replace(/&lt;/gm, '<')
          .replace(/&nbsp;/gm, ' ');
      }
      this.addTestLevelArrayGroups(res);

      this.defaultEnglishStage = this.defaultEnglishStage.filter(
        (el) => el.id !== res.id,
      );
    });
  }

  subscribeToAddEnglishChanges() {
    this.addEnglishForm
      .get('type')
      .valueChanges.pipe(
        filter((res) => !!res),
        takeUntil(this.destroy$),
      )
      .subscribe((res) => {
        if (res.type === 'TEST') {
          this.addEnglishForm
            .get('correctPoints')
            .setValidators([Validators.required]);
          this.addEnglishForm
            .get('totalPoints')
            .setValidators([Validators.required]);
        } else {
          this.addEnglishForm
            .get('correctPoints')
            .removeValidators([Validators.required]);
          this.addEnglishForm
            .get('totalPoints')
            .removeValidators([Validators.required]);

          this.addEnglishForm.patchValue(
            {
              totalPoints: null,
              correctPoints: null,
            },
            { emitEvent: false },
          );
        }
        this.addEnglishForm.updateValueAndValidity();
      });
  }

  subscribeToCorrectPoints() {
    this.addEnglishForm
      .get('totalPoints')
      .valueChanges.pipe(
        takeUntil(this.destroy$),
        takeWhile(() =>
          this.addEnglishFormControl('correctPoints').hasValidator(
            Validators.required,
          ),
        ),
        filter((res) => !!res),
        debounceTime(300),
      )
      .subscribe((res) => {
        this.addEnglishFormControl('correctPoints').setValidators([
          Validators.max(res),
        ]);
        this.addEnglishForm.updateValueAndValidity();
      });
  }

  subscribeToSpeakLevelChanges() {
    this.speakLevelControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter((res) => !!res),
      )
      .subscribe((res) => {
        const stage = this.feedback.scores.find((el) => el.type === 'SPEAK');
        stage.level = res;
        this.feedback.averageLevel = this.calculateAverageEnglishLevel();
        this.updateFeedback.emit(this.feedback);
      });
  }

  onAddEnglishStage() {
    if (this.feedback['scores']?.length > 1 || this.addEnglishForm.invalid)
      return;
    this.feedback['scores'].push({
      ...this.addEnglishForm.getRawValue(),
      name: this.addEnglishForm.value.type?.name,
      type: this.addEnglishForm.value.type?.type,
      id: this.addEnglishForm.value.type?.id,
      value: '',
    });

    this.addTestLevelArrayGroups();

    this.feedback.scores = this.feedback.scores.sort((a, b) => a.id - b.id);

    this.defaultEnglishStage = this.defaultEnglishStage.filter(
      (el) => el.id !== this.addEnglishForm.value.type.id,
    );
    this.addEnglishForm.reset();
    this.updateFeedback.emit(this.feedback);
  }

  onRemoveEnglishStag(stage, i: number) {
    this.feedback.scores = this.feedback.scores.filter(
      (el) => el.id !== stage.id,
    );

    const form = this.testTypeForm.controls[
      'testTypeFormArray'
    ] as UntypedFormArray;
    form.removeAt(i);
    this.defaultEnglishStage.push({
      id: stage.id,
      type: stage.type,
      name: stage.name,
    });
  }

  addTestLevelArrayGroups(data?) {
    const form = this.testTypeForm.controls[
      'testTypeFormArray'
    ] as UntypedFormArray;
    let valueType;
    if (data) {
      valueType =
        data.type === 'TEST'
          ? this.defaultEnglishTest.find((el) => el.id === data?.testType?.id)
          : this.defaultEnglishLevels.find((el) => el === data?.level);
    }
    const group = this.fb.group({
      testTypeControl: this.fb.control(data ? valueType : null, [
        Validators.required,
      ]),
      isTextFeedback: this.fb.control(data ? Boolean(data.textFeedback) : null),
    });

    form.push(group);
    const index = form.length - 1;
    group
      .get('testTypeControl')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const stage = this.feedback.scores[index];
        stage.testType = res;
        stage.level = this.calculateEnglishLevel(
          this.calculatePercentOfcorrectPoints(stage),
          stage?.testType,
        );

        this.feedback.averageLevel = this.calculateAverageEnglishLevel();
        this.updateFeedback.emit(this.feedback);
      });
    group
      .get('isTextFeedback')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        const stage = this.feedback.scores[index];
        stage.isTextFeedback = res;
        this.updateFeedback.emit(this.feedback);
      });
  }

  onChange({ editor }, stage) {
    stage.textFeedback = editor.getData();
  }

  get isAvailableUpdating() {
    // return this.permissionService.canUpdateInterviewStage(
    //   this.employee_details?.managers_team ?? []
    // );
    return true;
  }

  get isEnglishTestFeedback() {
    return this.addEnglishForm
      .get('totalPoints')
      .hasValidator(Validators.required);
  }

  get isContainLevel() {
    return this.feedback?.scores.some((el) => el.level);
  }

  addEnglishFormControl(control: string): UntypedFormControl {
    return this.addEnglishForm.get(control) as UntypedFormControl;
  }

  calculatePercentOfcorrectPoints(stage): number {
    return (stage?.correctPoints * 100) / stage.totalPoints;
  }

  setColorByValue(range) {
    if (range >= 1 && range <= 40) {
      return '#b00600';
    } else if (range >= 41 && range <= 60) {
      return '#dc4437';
    } else if (range >= 61 && range <= 80) {
      return '#f9a90c';
    } else if (range >= 81 && range <= 100) {
      return '#109d58';
    } else {
      return '#828299';
    }
  }

  calculateEnglishLevel(testScore, test) {
    const [middleLevel, upMiddleLevel] = test.name.split('-');
    if (testScore > 40 && testScore <= 60) {
      const currentLevelIndex = Number(EnglishLevels[middleLevel]);
      return EnglishLevels[currentLevelIndex - 1];
    } else if (testScore > 60 && testScore <= 70) {
      const currentLevelIndex = Number(EnglishLevels[middleLevel]);
      return EnglishLevels[currentLevelIndex];
    } else if (testScore > 70 && testScore <= 80) {
      const currentLevelIndex = Number(EnglishLevels[upMiddleLevel]);
      return EnglishLevels[currentLevelIndex];
    } else if (testScore > 80 && testScore <= 100) {
      const currentLevelIndex = Number(EnglishLevels[upMiddleLevel]);
      return (
        (test.type === 'ADVANCE'
          ? EnglishLevels[currentLevelIndex]
          : EnglishLevels[currentLevelIndex + 1]) + '-'
      );
    } else {
      const currentLevelIndex = Number(EnglishLevels[middleLevel]);
      return EnglishLevels[currentLevelIndex - 2];
    }
  }

  calculateAverageEnglishLevel() {
    const averageLevel = this.feedback.scores
      .map((res) => res.level)
      .map((res) => EnglishLevels[res] || EnglishLevels[res.replace('-', '')]);

    return EnglishLevels[
      averageLevel.reduce((curr, next) => curr + next, 0) /
        (averageLevel.length || 0)
    ];
  }

  get isCreation(): boolean {
    return this.id === PageActions.CREATION;
  }
  get isAllowToChange() {
    return this.isCreation ? true : this.feedback.editMode;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}

export enum EnglishLevels {
  'A1',
  'A1+',
  'A2',
  'A2+',
  'B1',
  'B1+',
  'B2',
  'B2+',
  'C1',
  'C1+',
  'C2',
  'C2+',
}

// B1-B1+ A2-B1

// A2-A2+
// B1-B1+
// B2-B2+
// C1-C2

// 40-60%
// 60-70% - A2 B1
// 70-80- A2+ B1+
// 80+ - B1 B2 (з мінусом)

// Use of English (Grammar & VOcabulary)
// Listening
// Reading
// Writing
