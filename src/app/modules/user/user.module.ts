import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [ChangePasswordComponent, UserComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule],
})
export class UserModule {}
