import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MultisiteManagementRoutingModule } from './multisite-management-routing.module';
import { MultisiteManagementComponent } from './multisite-management.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MultisiteManagementTableComponent } from './components';

@NgModule({
  declarations: [
    MultisiteManagementComponent,
    MultisiteManagementTableComponent,
  ],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    MultisiteManagementRoutingModule,
  ],
})
export class MultisiteManagementModule {}
