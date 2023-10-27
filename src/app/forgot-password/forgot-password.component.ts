import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { resetPasswordState } from 'src/app/shared/constansts/common/common.constants';
import { Location } from '@angular/common'
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordState: string = resetPasswordState.ResetEmail;
  formReset: FormGroup;
  constructor(private fb: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formReset = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email])
    })
  }

  sendEmailForReset() {
    this.resetPasswordState = resetPasswordState.WaitForEmail;
    // this.authService.sendEmailForResetPass(this.formReset.get('email').value);
  }

  goBack() {
    this.location.back();
  }

}
