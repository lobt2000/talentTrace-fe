import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UserType } from '../../constansts/user-type.model';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss'],
})
export class SignInComponent implements OnInit {
  form: UntypedFormGroup;
  @Input() typeOfUser: string = UserType.User;
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      companyEmail: this.fb.control(
        '',
        this.typeOfUser == UserType.User
          ? [Validators.required, Validators.email]
          : [],
      ),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&|?\\/<>~""\'\';:*?])[A-Za-z\\d#$@!%&|?\\/<>~""\'\';:*?]{8,30}$',
        ),
      ]),
    });
  }
}
