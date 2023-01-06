import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'src/app/shared/modal/modal.module';
import { UserStatusPipe } from 'src/app/lib/pipes/user-status.pipe';
import { UserManagementTableComponent } from './user-management-table.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UserManagementTableComponent, UserStatusPipe],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  exports: [UserManagementTableComponent],
})
export class UserManagementTableModule {}
