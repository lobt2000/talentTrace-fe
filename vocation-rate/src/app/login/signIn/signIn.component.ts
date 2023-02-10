import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType } from '../../shared/constansts/common.constants';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup
  @Input() typeOfUser: string = UserType.User
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      companyEmail: this.fb.control('', this.typeOfUser == UserType.User ? [Validators.required] : []),
      password: this.fb.control('', [Validators.required])
    })
  }
}
