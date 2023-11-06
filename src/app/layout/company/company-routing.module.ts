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
        redirectTo: 'manager-department',
        pathMatch: 'full',
      },
      {
        path: 'manager-department',
        loadChildren: () =>
          import('./manager-department/manager-department.module').then(
            (m) => m.ManagerDepartmentModule,
          ),
      },
      {
        path: 'company-members',
        loadChildren: () =>
          import('./staff-department/staff-department.module').then(
            (m) => m.StaffDepartmentModule,
          ),
      },
      {
        path: 'notiffications',
        loadComponent: () =>
          import('./notiffication/notiffication.component').then(
            (m) => m.NotifficationComponent,
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
