import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeDetailsComponent } from './employee-details.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDetailsRoutingModule {}