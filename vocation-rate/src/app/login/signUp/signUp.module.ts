import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './signUp.component';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    SignUpComponent
  ],
  providers: [],
})
export class SignUpModule { }
