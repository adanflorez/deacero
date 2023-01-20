import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementTableComponent } from './components/user-management-table/user-management-table.component';

import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { AlertModule } from 'src/app/shared/alert/alert.module';

import { UserStatusPipe } from 'src/app/core/pipes/user-status.pipe';
import { UserRolePipe } from 'src/app/core/pipes/user-role.pipe';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserManagementTableComponent,
    UserStatusPipe,
    UserRolePipe,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    NgbTypeaheadModule,
    AlertModule,
    ReactiveFormsModule,
    ModalModule,
    FormErrorModule,
  ],
})
export class UserManagementModule {}
