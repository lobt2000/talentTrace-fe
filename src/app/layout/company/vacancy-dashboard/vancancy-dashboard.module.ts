import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VacancyDashboardComponent } from './vacancy-dashboard.component';
import { VacancyDashboardRoutingModule } from './vacancy-dasboard.routing';
import { CollapseItemListModule } from 'src/app/shared/components/collapse-item-list/collapse-item-list.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [VacancyDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VacancyDashboardRoutingModule,
    CollapseItemListModule,
    SharedModule,
    TranslateModule,
  ],
  providers: [],
})
export class VacancyDashboardModule {}
