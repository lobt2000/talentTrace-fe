import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiToggleComponent } from './components/ui-toggle/ui-toggle.component';
import { TranslateModule } from '@ngx-translate/core';
import { SignInUpComponent } from './components/signInUp/signInUp.component';
import { SignInModule } from '../login/signIn/signIn.module';
import { SignUpModule } from '../login/signUp/signUp.module';

@NgModule({
  declarations: [
    UiToggleComponent,
    SignInUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    SignInModule,
    SignUpModule
  ],
  exports: [
    UiToggleComponent,
    SignInUpComponent
  ]
})
export class SharedModule { }
