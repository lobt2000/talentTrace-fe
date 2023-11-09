import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { CandidateDetailsComponent } from 'src/app/shared/components/candidate-details/candidate-details.component';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
  },
  {
    path: ':id',
    component: CandidateDetailsComponent,
  },
];

export const CandidatesRoutes = RouterModule.forChild(routes);
