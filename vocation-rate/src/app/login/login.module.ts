import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginRoutingModule } from './login-routing.module';;
import {HttpClientModule} from '@angular/common/http';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { SignInCompanyComponent } from './sign-in-company/sign-in-company.component';

@NgModule({
  declarations: [
    SignInUserComponent,
    LoginComponent,
    SignInCompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HttpClientModule
  ],
  providers: [],
})
export class LoginModule { }
