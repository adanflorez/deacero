import ProjectBudget from 'src/app/core/models/project-budget.model';

export default interface ProjectBudgetForm {
  contributions?: ProjectBudget[];
  conversions?: ProjectBudget[];
  donations?: ProjectBudget[];
  comment?: string;
}
