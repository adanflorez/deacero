import { AuthComponent } from './auth.component';
import { ValidateComponent } from './validate/validate.component';
import { CallComponent } from './call/call.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        component: LoginComponent,
      },
      {
        path: 'call',
        component: CallComponent,
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
