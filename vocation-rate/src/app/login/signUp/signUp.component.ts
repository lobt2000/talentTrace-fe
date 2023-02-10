import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserType } from '../../shared/constansts/common.constants';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup
  @Input() typeOfUser: string = UserType.User;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildUserForm();
  }

  buildUserForm() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      confPassword: this.fb.control('', []),
      companyEmail: this.fb.control('', []),
      password: this.fb.control('', [Validators.required])
    })
  }

}
