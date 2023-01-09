import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallManagementRoutingModule } from './call-management-routing.module';
import { CallManagementComponent } from './call-management.component';


@NgModule({
  declarations: [
    CallManagementComponent
  ],
  imports: [
    CommonModule,
    CallManagementRoutingModule
  ]
})
export class CallManagementModule { }
