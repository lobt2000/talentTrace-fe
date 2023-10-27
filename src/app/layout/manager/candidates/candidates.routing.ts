import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { CandidateProfileComponent } from 'src/app/shared/components/candidate-profile/candidate-profile.component';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
  },
  {
    path: ':id',
    component: CandidateProfileComponent,
  },
];

export const CandidatesRoutes = RouterModule.forChild(routes);
