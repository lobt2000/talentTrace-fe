import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseItemListModule } from 'src/app/shared/components/collapse-item-list/collapse-item-list.module';
import { ManagerDepartmentDashboardComponent } from './manager-department-dashboard.component';
import { ManagerDepartmentDashboardRoutingModule } from './manager-department-dashboard.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ManagerDepartmentDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ManagerDepartmentDashboardRoutingModule,
    CollapseItemListModule,
    SharedModule,
    TranslateModule,
  ],
  providers: [],
})
export class ManagerDepartmentDashboardModule {}
