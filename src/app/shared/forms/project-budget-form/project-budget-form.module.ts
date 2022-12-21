import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectBudgetFormComponent } from './project-budget-form.component';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { BudgetTableModule } from './../../tables/budget-table/budget-table.module';

@NgModule({
  declarations: [ProjectBudgetFormComponent],
  imports: [CommonModule, BudgetTableModule, AlertModule],
  exports: [ProjectBudgetFormComponent],
})
export class ProjectBudgetFormModule {}
