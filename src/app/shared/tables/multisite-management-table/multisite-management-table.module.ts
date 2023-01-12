import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultisiteManagementTableComponent } from './multisite-management-table.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MultisiteManagementTableComponent],
  imports: [CommonModule, NgbTypeaheadModule, ReactiveFormsModule],
  exports: [MultisiteManagementTableComponent],
})
export class MultisiteManagementTableModule {}
