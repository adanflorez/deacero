import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'src/app/shared/alert';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormErrorModule,
    AlertModule,
    NgbAlertModule,
    ReactiveFormsModule,
  ],
})
export class SignupModule {}
