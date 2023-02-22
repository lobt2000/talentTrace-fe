import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserType } from '../../shared/constansts/common.constants';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss']
})
export class SignUpComponent implements OnInit {
  form: UntypedFormGroup = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    confPassword: this.fb.control('', []),
    companyEmail: this.fb.control('', []),
    password: this.fb.control('', [Validators.required])
  })
  hidePass: boolean = true;
  hideConfirmPass: boolean = true;
  @Input() typeOfUser: string = UserType.User;
  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.buildUserForm();
  }

  buildUserForm() {
    // this.form = this.fb.group({
    //   email: this.fb.control('', [Validators.required, Validators.email]),
    //   confPassword: this.fb.control('', []),
    //   companyEmail: this.fb.control('', []),
    //   password: this.fb.control('', [Validators.required])
    // })
  }

}
