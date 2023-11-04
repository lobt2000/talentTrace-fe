import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import {
  countriesType,
  departmentTypes,
  employmentTypes,
  positionTypes,
  qualificationLevel,
  statusTypes,
  subDepartmentTypes,
  unitTypes,
} from '../../constansts/personal-info-constants/personal-info.model';
import { ICommon } from '../../interfaces/common/common.interface';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-general-info-profile',
  templateUrl: './general-info-profile.component.html',
  styleUrls: ['./general-info-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInfoProfileComponent implements OnInit, OnChanges {
  @Input() editMode: boolean = false;
  @Input() hideActionButton: boolean = false;
  @Input() person;
  @Output() updateFormValue: EventEmitter<any> = new EventEmitter();
  employeeFrom: UntypedFormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(): void {
    if (this.person) this.updateForm();
  }

  buildForm() {
    this.employeeFrom = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      surName: this.fb.control('', [Validators.required]),
      startDate: this.fb.control('', [Validators.required]),
      department: this.fb.control('', [Validators.required]),
      projectName: this.fb.control('', [Validators.required]),
      unit: this.fb.control('', [Validators.required]),
      hr: this.fb.control('', [Validators.required]),
      position: this.fb.control('', [Validators.required]),
      country: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      phoneNumber: this.fb.control('', [Validators.required]),
      workEmail: this.fb.control('', [Validators.required, Validators.email]),
      status: this.fb.control('', [Validators.required]),
      employmentType: this.fb.control('', [Validators.required]),
      level: this.fb.control(''),
      subDepartment: this.fb.control(''),
    });

    console.log(this.person);

    if (this.person) this.updateForm();
    this.subscribeToDepartmentChanges();
    this.subscribeToPositionChanges();

    this.employeeFrom.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      this.updateFormValue.emit(this.employeeFrom);
    });
  }

  updateForm() {
    console.log(this.employeeFrom);

    this.employeeFrom.patchValue({ ...this.person });
  }

  triggerAnimation(type: boolean, editType: string) {
    this.editMode = type;
    setTimeout(() => {
      // type ? this.form.enable() : this.form.disable();
    }, 500);
  }

  subscribeToDepartmentChanges() {
    this.employeeFrom.get('department').valueChanges.subscribe((res) => {
      this.initSubDepartmentControl(res);
    });
  }

  subscribeToPositionChanges() {
    this.employeeFrom.get('position').valueChanges.subscribe((res) => {
      this.initLevelControl(res);
    });
  }

  initLevelControl(value: ICommon | null) {
    if (value.hasOwnProperty('id')) {
      this.employeeFrom.get('level').setValidators([Validators.required]);
      this.employeeFrom.get('level').updateValueAndValidity();
      this.employeeFrom.get('level').setValue(null);
    } else {
      this.employeeFrom.get('level').removeValidators([Validators.required]);
      this.employeeFrom.get('level').updateValueAndValidity();
      this.employeeFrom.get('level').setValue(null);
    }
  }

  initSubDepartmentControl(value: ICommon | null) {
    if (value && value.id === 6) {
      this.employeeFrom
        .get('subDepartment')
        .setValidators([Validators.required]);
      this.employeeFrom.get('subDepartment').updateValueAndValidity();
      this.employeeFrom.get('subDepartment').setValue(null);
    } else {
      this.employeeFrom
        .get('subDepartment')
        .removeValidators([Validators.required]);
      this.employeeFrom.get('subDepartment').updateValueAndValidity();
      this.employeeFrom.get('subDepartment').setValue(null);
    }
  }

  getValueFromForm(field: string, option?: string): string {
    const value = this.employeeFrom.get(field).value;
    return option ? value[option] : value;
  }

  get employmentType() {
    return employmentTypes;
  }

  get status() {
    return statusTypes;
  }

  get departments() {
    return departmentTypes;
  }

  get subDepartments() {
    return subDepartmentTypes;
  }

  get positions() {
    const department = this.employeeFrom.get('department').value;
    const subDepartment = this.employeeFrom.get('subDepartment').value;
    return positionTypes.filter(
      (el) =>
        el.department.id === (subDepartment ? subDepartment.id : department.id),
    );
  }

  get levels() {
    return qualificationLevel;
  }

  get units() {
    return unitTypes;
  }

  get countries() {
    return countriesType;
  }
}
