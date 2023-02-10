import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './signIn.component';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    SignInComponent
  ],
  providers: [],
})
export class SignInModule { }
