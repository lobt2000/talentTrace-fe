import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './company-routing.module';
import { SidebarMenuModule } from 'src/app/shared/components/sidebar-menu/sidebar-menu.module';
import { CompanyComponent } from './company.component';
import { VacancyDashboardComponent } from './vacancy-dashboard/vacancy-dashboard.component';

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CompanyRoutingModule,
    SidebarMenuModule,
  ],
  providers: [],
})
export class CompanyModule {}
