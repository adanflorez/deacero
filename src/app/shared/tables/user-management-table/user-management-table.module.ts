import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRolePipe } from 'src/app/lib/pipes/user-role.pipe';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { UserStatusPipe } from 'src/app/lib/pipes/user-status.pipe';
import { UserManagementTableComponent } from './user-management-table.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserManagementTableComponent, UserStatusPipe, UserRolePipe],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    ModalModule,
    ReactiveFormsModule,
    AlertModule,
  ],
  exports: [UserManagementTableComponent],
})
export class UserManagementTableModule {}
