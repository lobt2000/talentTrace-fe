import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { TabContainerComponent } from '../shared/components/tab-container/tab-container.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, TabContainerComponent],
  providers: [],
})
export class LoginModule {}
