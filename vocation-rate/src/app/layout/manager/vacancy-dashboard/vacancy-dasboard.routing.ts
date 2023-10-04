import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VacancyDashboardComponent } from './vacancy-dashboard.component';
import { VacancyDetailsComponent } from './vacancy-details/vacancy-details.component';

const routes: Routes = [
  {
    path: '',
    component: VacancyDashboardComponent,
  },
  {
    path: ':id',
    component: VacancyDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyDashboardRoutingModule {}
