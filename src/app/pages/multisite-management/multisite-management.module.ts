import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultisiteManagementRoutingModule } from './multisite-management-routing.module';
import { MultisiteManagementComponent } from './multisite-management.component';

@NgModule({
  declarations: [MultisiteManagementComponent],
  imports: [CommonModule, MultisiteManagementRoutingModule],
})
export class MultisiteManagementModule {}
