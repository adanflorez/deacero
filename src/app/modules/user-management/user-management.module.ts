import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UserRolePipe } from 'src/app/core/pipes/user-role.pipe';
import { UserStatusPipe } from 'src/app/core/pipes/user-status.pipe';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';

import { UserManagementTableComponent } from './components';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';

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
    NgbPaginationModule,
    AlertModule,
    ReactiveFormsModule,
    ModalModule,
    FormErrorModule,
  ],
})
export class UserManagementModule {}
