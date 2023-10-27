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
            (m) => m.VacancyDashboardModule,
          ),
      },
      {
        path: 'employee-dashboard',
        loadChildren: () =>
          import('./employee-dashboard/employee-dashboard.module').then(
            (m) => m.EmployeeDashboardModule,
          ),
      },
      {
        path: 'candidates',
        loadChildren: () =>
          import('./candidates/candidates.module').then(
            (m) => m.CandidatesModule,
          ),
      },
    ],
  },
];

export const ManagerRoutes = RouterModule.forChild(routes);
