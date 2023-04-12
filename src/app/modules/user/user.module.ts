import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ChangePasswordGateway, ChangePasswordUseCase } from './domain';
import {
  ChangePasswordImplementation,
  ChangePasswordService,
} from './infrastructure';
import { ChangePasswordComponent } from './pages';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [ChangePasswordComponent, UserComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
  providers: [
    ChangePasswordService,
    {
      provide: ChangePasswordUseCase,
      useFactory: (changePasswordGateway: ChangePasswordGateway) =>
        new ChangePasswordUseCase(changePasswordGateway),
      deps: [ChangePasswordGateway],
    },
    {
      provide: ChangePasswordGateway,
      useClass: ChangePasswordImplementation,
    },
  ],
})
export class UserModule {}
