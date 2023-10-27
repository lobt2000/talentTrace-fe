import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
})
export class GeneralInfoProfileComponent implements OnInit {
  @Input() editMode: boolean = false;
  employeeFrom: UntypedFormGroup;

  jobTypes: Array<any> = [
    { name: 'Full-Time', id: 0 },
    { name: 'Part-Time', id: 1 },
    { name: 'Seasonal', id: 2 },
    { name: 'Contract', id: 3 },
    { name: 'Temporary', id: 4 },
  ];

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.buildForm();
    if (!this.editMode) this.initData();
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
      workEmail: this.fb.control('', [Validators.required]),
    });
  }

  initData() {
    this.updateForm();
  }

  updateForm() {
    const data = {
      firstName: 'Petro',
      surName: 'Antonushun',
      startDate: '12/01/2001',
      department: 'Software Engeneer',
      projectName: 'ARTY',
      unit: 'Unit 1',
      hr: 'Irena Mudra',
      position: 'Middle Software Engineer',
      country: 'Ukraine',
      city: 'Lviv',
      phoneNumber: '+09713026565',
      workEmail: 'bkolodiy@gmail.com',
    };

    this.employeeFrom.patchValue(data);
  }

  triggerAnimation(type: boolean, editType: string) {
    this.editMode = type;
    setTimeout(() => {
      // type ? this.form.enable() : this.form.disable();
    }, 500);
  }
}
