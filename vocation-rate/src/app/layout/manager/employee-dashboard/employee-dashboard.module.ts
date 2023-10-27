import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeDashboardRoutingModule } from './employee-dashboard.routing';
import { UiDashboardTableModule } from 'src/app/shared/components/base-table/ui-dashboard-table/ui-dashboard-table.module';

@NgModule({
  declarations: [EmployeeDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    TranslateModule,
    EmployeeDashboardRoutingModule,
    UiDashboardTableModule
  ],
})
export class EmployeeDashboardModule {}
