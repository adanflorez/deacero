import { FormErrorModule } from './../shared/form-error/form-error.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { AlertModule } from './../shared/alert/alert.module';
import { ModalModule } from './../shared/modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SignupComponent } from './signup/signup.component';
import { CallComponent } from './call/call.component';
import { ValidateComponent } from './validate/validate.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordRecoveryComponent,
    SignupComponent,
    CallComponent,
    ValidateComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    AlertModule,
    NavbarModule,
    FormErrorModule,
  ],
})
export class AuthModule {}
