import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { LayoutComponent } from './layout/layout/layout.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './core/guards/GuardPages';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.NgxAuthModule),
  },
  {
    path: 'home',
    component: LayoutComponent,
    // canActivate:[AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    title: 'Inicio'
  },
  {
    path: 'pages',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./modules/pages/pages.module')
      .then(m => m.PagesModule)

  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
