import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VacancyDashboardComponent } from './vacancy-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: VacancyDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyDashboardRoutingModule {}
