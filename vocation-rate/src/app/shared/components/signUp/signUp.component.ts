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
  form: UntypedFormGroup;
  hidePass: boolean = true;
  hideConfirmPass: boolean = true;
  @Input() typeOfUser: string = UserType.User;
  @Output() formValue: EventEmitter<any> = new EventEmitter();
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.buildUserForm();
  }

  buildUserForm() {
    this.form = this.fb.group({
      email: this.fb.control('sdfs@sdfsdf.com', [
        Validators.required,
        Validators.email,
      ]),
      confPassword: this.fb.control('adasA231@dasdas', [
        Validators.required,
        this.confirmPassValidator(),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&|?\\/<>~""\'\';:*?])[A-Za-z\\d#$@!%&|?\\/<>~""\'\';:*?]{8,30}$'
        ),
      ]),
      ...(this.typeOfUser == 'user' && {
        companyEmail: this.fb.control('', [
          Validators.required,
          Validators.email,
        ]),
      }),
      password: this.fb.control('adasA231@dasdas', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&|?\\/<>~""\'\';:*?])[A-Za-z\\d#$@!%&|?\\/<>~""\'\';:*?]{8,30}$'
        ),
      ]),
    });
  }

  confirmPassValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.form?.value?.password !== control.value
        ? { notmatch: 'This value should be the same as password' }
        : null;
  }

  submitForm() {
    if (this.form.valid) {
      this.formValue.emit(this.form.getRawValue());
    }
  }
}
