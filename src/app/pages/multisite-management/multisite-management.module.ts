import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultisiteManagementRoutingModule } from './multisite-management-routing.module';
import { MultisiteManagementComponent } from './multisite-management.component';
import { MultisiteManagementTableModule } from 'src/app/shared/tables/multisite-management-table/multisite-management-table.module';

@NgModule({
  declarations: [MultisiteManagementComponent],
  imports: [
    CommonModule,
    MultisiteManagementRoutingModule,
    MultisiteManagementTableModule,
  ],
})
export class MultisiteManagementModule {}
