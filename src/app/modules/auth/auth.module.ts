import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertModule } from '../../shared/alert/alert.module';
import { DaButtonModule } from '../../shared/da-button/da-button.module';
import { FormErrorModule } from '../../shared/form-error/form-error.module';
import { ModalModule } from '../../shared/modal/modal.module';
import { NavbarModule } from '../../shared/navbar/navbar.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CallComponent } from './call/call.component';
import { SignupComponent } from './signup/signup.component';
import { ValidateComponent } from './validate/validate.component';

@NgModule({
  declarations: [
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
    DaButtonModule,
    NgbAlertModule,
  ],
})
export class AuthModule {}
