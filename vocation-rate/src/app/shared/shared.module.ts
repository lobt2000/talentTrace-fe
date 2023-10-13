import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiToggleComponent } from './components/ui-toggle/ui-toggle.component';
import { TranslateModule } from '@ngx-translate/core';
import { TabContainerComponent } from './components/tab-container/tab-container.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './components/signUp/signUp.component';
import { SignInComponent } from './components/signIn/signIn.component';
import { RouterModule } from '@angular/router';
import { UiPageComponent } from './components/ui-page/ui-page.component';
import { UiBreadcrumbsComponent } from './components/ui-breadcrumbs/ui-breadcrumbs.component';
import { UiInstructionComponent } from './components/ui-instruction/ui-instruction.component';
import { PermissionsModalComponent } from './components/modals/permissions-modal/permissions-modal.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { GoogleMapsModalComponent } from './components/modals/google-maps-modal/google-maps-modal.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    UiToggleComponent,
    TabContainerComponent,
    SignUpComponent,
    SignInComponent,
    UiPageComponent,
    UiBreadcrumbsComponent,
    UiInstructionComponent,
    PermissionsModalComponent,
    ClickOutsideDirective,
    GoogleMapsModalComponent,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,

    MatIconModule,
  ],
  exports: [
    UiToggleComponent,
    TabContainerComponent,
    UiPageComponent,
    UiInstructionComponent,
    ClickOutsideDirective,
  ],
})
export class SharedModule {}
