import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeDashboardComponent } from './employee-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./employee-details/employee-details.module').then(
        (m) => m.EmployeeDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDashboardRoutingModule {}
