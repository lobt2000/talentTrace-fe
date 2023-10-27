import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VacancyDetailsComponent } from './vacancy-details.component';

const routes: Routes = [
  {
    path: '',
    component: VacancyDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyDetailsRoutingModule {}
