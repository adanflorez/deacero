import { BudgetTableModule } from './../../tables/budget-table/budget-table.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectBudgetFormComponent } from './project-budget-form.component';

@NgModule({
  declarations: [ProjectBudgetFormComponent],
  imports: [CommonModule, BudgetTableModule],
  exports: [ProjectBudgetFormComponent],
})
export class ProjectBudgetFormModule {}
