import { Routes, RouterModule } from '@angular/router';
import { StaffDepartmentComponent } from './staff-department.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManuallAdditionComponent } from './manuall-addition/manuall-addition.component';
import { UploadingAdditionComponent } from './uploading-addition/uploading-addition.component';

const routes: Routes = [
  {
    path: '',
    component: StaffDepartmentComponent,
    children: [
      {
        path: 'add-manually',
        component: ManuallAdditionComponent,
        pathMatch: 'full',
      },
      {
        path: 'add-uploading',
        component: UploadingAdditionComponent,
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
