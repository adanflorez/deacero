import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { ValidateComponent } from './validate/validate.component';
import { AnnouncementComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login').then(m => m.LoginModule),
      },
      {
        path: 'call',
        loadChildren: () => import('./pages/call').then(m => m.CallModule),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./pages/signup').then(m => m.SignupModule),
      },
      {
        path: 'validate',
        component: ValidateComponent,
      },
      {
        path: 'announcement',
        component: AnnouncementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
