import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';

import { BudgetTableComponent } from './budget-table.component';

@NgModule({
  declarations: [BudgetTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormErrorModule],
  exports: [BudgetTableComponent],
})
export class BudgetTableModule {}
