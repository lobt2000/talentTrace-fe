import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
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
      // {
      //   path: 'manager-department',
      //   loadChildren: () =>
      //     import('./manager-department/manager-department.module').then(
      //       (m) => m.ManagerDepartmentModule
      //     ),
      // },
      // {
      //   path: 'company-members',
      //   loadChildren: () =>
      //     import('./staff-department/staff-department.module').then(
      //       (m) => m.StaffDepartmentModule
      //     ),
      // },
    ],
  },
];

export const ManagerRoutes = RouterModule.forChild(routes);
