import { NgModule } from '@angular/core';

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
import { GoogleMapsModalComponent } from './components/modals/google-maps-modal/google-maps-modal.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GenerationUrlComponent } from './components/modals/generation-url/generation-url.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';

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
    GoogleMapsModalComponent,
    GenerationUrlComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
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
    ClipboardModule,
  ],
  exports: [
    UiToggleComponent,
    TabContainerComponent,
    UiPageComponent,
    UiInstructionComponent,
  ],
})
export class SharedModule {}
