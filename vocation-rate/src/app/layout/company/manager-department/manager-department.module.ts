import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseItemListModule } from 'src/app/shared/components/collapse-item-list/collapse-item-list.module';
import { ManagerDepartmentComponent } from './manager-department.component';
import { ManagerDepartmentRoutingModule } from './manager-department.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddManagersComponent } from './add-managers/add-managers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { UiDashboardTableModule } from 'src/app/shared/components/base-table/ui-dashboard-table/ui-dashboard-table.module';

@NgModule({
  declarations: [
    ManagerDepartmentComponent,
    AddManagersComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ManagerDepartmentRoutingModule,
    CollapseItemListModule,
    SharedModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    UiDashboardTableModule,
  ],
  providers: [],
})
export class ManagerDepartmentModule {}
