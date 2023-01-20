import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallManagementRoutingModule } from './call-management-routing.module';
import { CallManagementComponent } from './call-management.component';

import { CallManagementTableModule } from 'src/app/shared/tables/call-management-table/call-management-table.module';

@NgModule({
  declarations: [CallManagementComponent],
  imports: [
    CommonModule,
    CallManagementRoutingModule,
    CallManagementTableModule,
  ],
})
export class CallManagementModule {}
