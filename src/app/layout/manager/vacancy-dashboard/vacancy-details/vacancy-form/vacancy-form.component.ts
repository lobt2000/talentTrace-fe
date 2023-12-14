import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { debounceTime } from 'rxjs';
import {
  Skills,
  getSkillsArray,
} from 'src/app/shared/constansts/vacation.constants';

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyFormComponent implements OnInit, OnChanges {
  @Input() isCreation: boolean;
  @Input() vacancy_details;
  @Output() changeFormValue: EventEmitter<UntypedFormGroup> =
    new EventEmitter();
  @Output() editFormValue: EventEmitter<UntypedFormGroup> = new EventEmitter();
  editor = ClassicEditor;

  editorData = '';
  editMode: string;
  currManager;

  candidates = [
    {
      name: 'Josef Monit',

      image: 'assets/img/dev-company-logo.jpeg',
    },
    {
      name: 'Rober Nodur',
      image: 'assets/img/logo2.0.png',
    },
  ];
  jobTypes: Array<any> = [
    { name: 'Full-Time', id: 0 },
    { name: 'Part-Time', id: 1 },
    { name: 'Seasonal', id: 2 },
    { name: 'Contract', id: 3 },
    { name: 'Temporary', id: 4 },
  ];
  currencies: Array<any> = [
    { name: 'usd', icon: 'attach_money', id: 0 },
    { name: 'eur', icon: 'euro_symbol', id: 1 },
    { name: 'gbp', icon: 'currency_pound', id: 2 },
    { name: 'uah', icon: 'euro_symbol', id: 3 },
  ];
  form: UntypedFormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.currManager = JSON.parse(localStorage.getItem('userData'));
    this.buildInfoForm();
  }

  ngOnChanges(): void {
    if (!this.isCreation) {
      this.updateForm();
    }
  }

  buildInfoForm() {
    this.form = this.fb.group({
      range: this.fb.group({
        start: this.fb.control(<Date | null>null, [Validators.required]),
        end: this.fb.control(<Date | null>null, [Validators.required]),
      }),
      quota: this.fb.control('', [Validators.required]),
      expirience: this.fb.control('', [Validators.required]),
      jobType: this.fb.control('', [Validators.required]),
      salary: this.fb.group({
        currency: this.fb.control('', [Validators.required]),
        value: this.fb.control('', [Validators.required]),
      }),
      location: this.fb.control(''),
      skill: this.fb.control('', [Validators.required]),
      bgIcon: this.fb.control({
        data: 'assets/img/vacation-header-background.jpeg',
      }),
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      hiring_manger: this.fb.control(this.currManager.name),
    });

    this.changeEditMode();

    this.form.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.changeFormValue.emit(this.form);
    });
  }

  updateForm() {
    if (this.form) {
      console.log(this.vacancy_details);

      this.form?.patchValue({
        ...this.vacancy_details,
        description: this.vacancy_details?.description
          .replace(/&lt;/gm, '<')
          .replace(/&nbsp;/gm, ' '),
        jobType: this.jobTypes.find(
          (el) => el.id === this.vacancy_details.jobType.id,
        ),
        salary: {
          currency: this.currencies.find(
            (el) => el.id === this.vacancy_details.salary.currency.id,
          ),
          value: this.vacancy_details.salary.value,
        },
      });

      this.editorData = this.vacancy_details?.description
        .replace(/&lt;/gm, '<')
        .replace(/&nbsp;/gm, ' ');
    }

    this.changeEditMode;
  }

  get getSelectedValue() {
    return this.currencies.find(
      (res) => res.icon == this.form.get('salary').value.currency.icon,
    )?.icon;
  }

  onChange({ editor }) {
    this.editorData = editor.getData();
    this.form.get('description').patchValue(this.editorData);
  }

  openLocationModal() {
    // this.dialog.closeAll();
    // this.dialog.open(GoogleMapsModalComponent, {
    //   width: '60vw',
    //   height: '600px',
    //   position: {
    //     left: 'calc(50% - 20vw)',
    //   },
    //   data: '',
    // });
  }

  triggerAnimation(type: boolean, editType: string, close?: boolean) {
    this.editMode = editType;
    setTimeout(() => {
      type ? this.form.enable() : close ? this.form.disable() : this.onEdit();
    }, 500);
  }

  get skills(): Array<Skills | string> {
    return getSkillsArray();
  }

  changeEditMode() {
    if (this.isCreation) {
      this.editMode = 'edit';
      this.form.enable();
    } else {
      this.editMode = 'save';
      this.form.disable();
    }
  }

  onUploadBgImg(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.form.get('bgIcon').patchValue({ data: e.target.result });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onEdit() {
    this.editFormValue.emit(this.form);
  }

  getFormControl(name: string): UntypedFormControl {
    return this.form.get(name) as UntypedFormControl;
  }
}
