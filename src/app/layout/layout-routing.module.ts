import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { IsCompanyGuard } from '../shared/guards/is-company.guard';
import { CommonUrls } from '../shared/constansts/common/common.constants';
import { IsManagerGuard } from '../shared/guards/is-manager.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'registration',
        loadChildren: () =>
          import('../registration/registration.module').then(
            (m) => m.RegistrationModule,
          ),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('../forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule,
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../initial-page/initial-page.module').then(
            (m) => m.InitialPageModule,
          ),
      },
      {
        path: CommonUrls.Company,
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
        canActivate: [AuthGuard, IsCompanyGuard],
      },
      {
        path: CommonUrls.Manager,
        loadChildren: () =>
          import('./manager/manager.module').then((m) => m.ManagerModule),
        canActivate: [AuthGuard, IsManagerGuard],
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
