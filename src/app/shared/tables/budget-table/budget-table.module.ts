import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetTableComponent } from './budget-table.component';

@NgModule({
  declarations: [BudgetTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [BudgetTableComponent],
})
export class BudgetTableModule {}
