import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { ValidateComponent } from './validate/validate.component';

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
        component: SignupComponent,
      },
      {
        path: 'validate',
        component: ValidateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
