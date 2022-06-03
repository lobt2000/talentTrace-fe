import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then((m) => m.LoginModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../initial-page/initial-page.module').then((m) => m.InitialPageModule)
      },
      {
        path: "**",
        redirectTo: 'home',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
