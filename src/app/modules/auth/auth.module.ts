import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarModule } from '../../shared/navbar/navbar.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ValidateComponent } from './validate/validate.component';

@NgModule({
  declarations: [ValidateComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, NavbarModule],
})
export class AuthModule {}
