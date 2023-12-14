import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { TabContainerComponent } from '../shared/components/tab-container/tab-container.component';

@NgModule({
  imports: [CommonModule, RegistrationRoutingModule, TabContainerComponent],
  declarations: [RegistrationComponent],
})
export class RegistrationModule {}
