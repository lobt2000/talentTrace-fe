import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserType } from '../../constansts/user-type.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class SignInComponent implements OnInit {
  form: UntypedFormGroup;
  @Input() typeOfUser: string = UserType.User;
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: this.fb.control('pantonushyn@binariks.com', [
        Validators.required,
        Validators.email,
      ]),
      companyEmail: this.fb.control(
        'bkolodiy@gmail.com',
        this.typeOfUser == UserType.User
          ? [Validators.required, Validators.email]
          : [],
      ),
      password: this.fb.control('adasA231@dasdas', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&|?\\/<>~""\'\';:*?])[A-Za-z\\d#$@!%&|?\\/<>~""\'\';:*?]{8,30}$',
        ),
      ]),
    });
  }

  submitForm() {
    console.log(this.form.valid);

    if (this.form.valid) {
      const body = { ...this.form.getRawValue() };
      if (!this.form.get('companyEmail').hasValidator(Validators.required))
        delete body.companyEmail;
      this.formValue.emit(body);
    }
  }
}
