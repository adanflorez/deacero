import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementTableComponent } from './user-management-table.component';

@NgModule({
  declarations: [UserManagementTableComponent],
  imports: [CommonModule],
  exports: [UserManagementTableComponent],
})
export class UserManagementTableModule {}
