import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';

import { EmployeeDetailsRoutingModule } from './employee-details.routing';
import { EmployeeDetailsComponent } from './employee-details.component';
import { ManagersTeamComponent } from '../shared/components/managers-team/managers-team.component';
import { PerfomanceComponent } from '../shared/components/perfomance/perfomance.component';
import { GeneralInfoProfileComponent } from 'src/app/shared/components/general-info-profile/general-info-profile.component';

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeDetailsRoutingModule,
    SharedModule,
    TranslateModule,
    MatTabsModule,
    ManagersTeamComponent,
    PerfomanceComponent,
    GeneralInfoProfileComponent,
  ],
})
export class EmployeeDetailsModule {}
