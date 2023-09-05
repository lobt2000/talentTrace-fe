import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagerDepartmentComponent } from './manager-department.component';
import { AddManagersComponent } from './add-managers/add-managers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerDepartmentComponent,
    children: [
      {
        path: 'add-managers',
        component: AddManagersComponent,
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
