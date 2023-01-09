import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallManagementTableComponent } from './call-management-table.component';

@NgModule({
  declarations: [CallManagementTableComponent],
  imports: [CommonModule],
  exports: [CallManagementTableComponent],
})
export class CallManagementTableModule {}
