import ProjectBudget from 'src/app/core/models/project-budget.model';

export interface ProjectBudgetForm {
  contributions?: ProjectBudget[];
  conversions?: ProjectBudget[];
  donations?: ProjectBudget[];
  comment?: string;
}
