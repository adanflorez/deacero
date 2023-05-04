import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';

import { RemunerationTableComponent } from './remuneration-table.component';

@NgModule({
  declarations: [RemunerationTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [RemunerationTableComponent],
})
export class RemunerationTableModule {}
