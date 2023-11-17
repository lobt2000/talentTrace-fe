import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeDetailsComponent } from './employee-details.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDetailsComponent,
    children: [
      {
        path: 'perfomance/:id',
        loadComponent: () =>
          import(
            '../../../../shared/components/perfomance-details/perfomance-details.component'
          ).then((m) => m.PerfomanceDetailsComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeDetailsRoutingModule {}
