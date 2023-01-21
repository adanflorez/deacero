import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { DaButtonModule } from 'src/app/shared/da-button/da-button.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';

import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent, PasswordRecoveryComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AlertModule,
    ReactiveFormsModule,
    DaButtonModule,
    ModalModule,
  ],
})
export class LoginModule {}
