import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CallManagementTableComponent } from './call-management-table.component';

@NgModule({
  declarations: [CallManagementTableComponent],
  imports: [CommonModule, NgbTypeaheadModule, ReactiveFormsModule],
  exports: [CallManagementTableComponent],
})
export class CallManagementTableModule {}
