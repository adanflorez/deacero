import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { ManagementTableComponent } from './components';
import { MultisiteService } from './infrastructure';
import { MultisiteManagementRoutingModule } from './multisite-management-routing.module';
import { MultisiteManagementComponent } from './multisite-management.component';

@NgModule({
  declarations: [MultisiteManagementComponent, ManagementTableComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    MultisiteManagementRoutingModule,
  ],
  providers: [MultisiteService],
})
export class MultisiteManagementModule {}
