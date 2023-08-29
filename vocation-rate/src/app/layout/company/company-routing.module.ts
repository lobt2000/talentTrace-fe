import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { IsCompanyGuard } from 'src/app/shared/guards/is-company.guard';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: '',
        redirectTo: 'vacancy-dashboard',
        pathMatch: 'full',
      },
      {
        path: 'vacancy-dashboard',
        loadChildren: () =>
          import('./vacancy-dashboard/vancancy-dashboard.module').then(
            (m) => m.VacancyDashboardModule
          ),

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
