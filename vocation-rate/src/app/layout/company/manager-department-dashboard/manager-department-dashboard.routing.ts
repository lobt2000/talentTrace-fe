import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManagerDepartmentDashboardComponent } from './manager-department-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: ManagerDepartmentDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerDepartmentDashboardRoutingModule {}
