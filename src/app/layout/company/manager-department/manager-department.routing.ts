import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagerDepartmentComponent } from './manager-department.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManuallAdditionComponent } from './manuall-addition/manuall-addition.component';
import { AdditionByUploadingComponent } from './addition-by-uploading/addition-by-uploading.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerDepartmentComponent,
    children: [
      {
        path: 'add-manually',
        component: ManuallAdditionComponent,
        pathMatch: 'full',
      },
      {
        path: 'add-uploading',
        component: AdditionByUploadingComponent,
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerDepartmentRoutingModule {}
