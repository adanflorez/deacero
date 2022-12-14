import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CallManagementTableComponent } from './call-management-table.component';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';
import { AlertModule } from 'src/app/shared/alert/alert.module';

@NgModule({
  declarations: [CallManagementTableComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FormErrorModule,
    AlertModule,
  ],
  exports: [CallManagementTableComponent],
})
export class CallManagementTableModule {}
