import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffDepartmentComponent } from './staff-department.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { UiDashboardTableModule } from 'src/app/shared/components/base-table/ui-dashboard-table/ui-dashboard-table.module';
import { CollapseItemListModule } from 'src/app/shared/components/collapse-item-list/collapse-item-list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StaffDepartmentRoutes } from './staff-department.routing';
import { AddCompanyMembersComponent } from './add-managers/add-company-members.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StaffDepartmentRoutes,
    CollapseItemListModule,
    SharedModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    UiDashboardTableModule,
  ],
  declarations: [
    StaffDepartmentComponent,
    AddCompanyMembersComponent,
    DashboardComponent,
  ],
})
export class StaffDepartmentModule {}
