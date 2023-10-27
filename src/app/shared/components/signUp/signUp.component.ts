import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserType } from '../../constansts/user-type.model';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss'],
})
export class SignUpComponent implements OnInit {
  formEmail: UntypedFormGroup;
  formPassword: UntypedFormGroup;
  hidePass: boolean = true;
  hideConfirmPass: boolean = true;
  @Input() typeOfUser: string = UserType.User;
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.buildUserForm();
  }

  buildUserForm() {
    this.formEmail = this.fb.group({
      email: this.fb.control('sdfs@sdfsdf.com', [
        Validators.required,
        Validators.email,
      ]),
      ...(this.typeOfUser == 'user' && {
        companyEmail: this.fb.control('adasA231@dasdas', [
          Validators.required,
          Validators.email,
        ]),
      }),
    });
    this.formPassword = this.fb.group({
      confPassword: this.fb.control('adasA231@dasdas', [
        Validators.required,
        this.confirmPassValidator(),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&|?\\/<>~""\'\';:*?])[A-Za-z\\d#$@!%&|?\\/<>~""\'\';:*?]{8,30}$',
        ),
      ]),

      password: this.fb.control('adasA231@dasdas', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&|?\\/<>~""\'\';:*?])[A-Za-z\\d#$@!%&|?\\/<>~""\'\';:*?]{8,30}$',
        ),
      ]),
    });
  }

  confirmPassValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.formPassword?.value?.password !== control.value
        ? { notmatch: 'This value should be the same as password' }
        : null;
  }

  submitForm() {
    if (this.formPassword.valid && this.formEmail.valid) {
      this.formValue.emit({
        ...this.formEmail.getRawValue(),
        ...this.formPassword.getRawValue(),
      });
    }
  }
}
