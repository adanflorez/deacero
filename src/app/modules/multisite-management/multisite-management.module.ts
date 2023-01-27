import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MultisiteManagementRoutingModule } from './multisite-management-routing.module';
import { MultisiteManagementComponent } from './multisite-management.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagementTableComponent } from './components';

@NgModule({
  declarations: [MultisiteManagementComponent, ManagementTableComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    MultisiteManagementRoutingModule,
  ],
})
export class MultisiteManagementModule {}
