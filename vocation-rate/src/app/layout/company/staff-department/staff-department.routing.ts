import { Routes, RouterModule } from '@angular/router';
import { StaffDepartmentComponent } from './staff-department.component';
import { AddCompanyMembersComponent } from './add-managers/add-company-members.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StaffDepartmentComponent,
    children: [
      {
        path: 'add-members',
        component: AddCompanyMembersComponent,
        pathMatch: 'full',
      },
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
    ],
  },
];

export const StaffDepartmentRoutes = RouterModule.forChild(routes);
