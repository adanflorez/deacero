import ProjectBudget from 'src/app/lib/models/project-budget.model';

export default interface ProjectBudgetForm {
  contributions?: ProjectBudget[];
  conversions?: ProjectBudget[];
  donations?: ProjectBudget[];
  comment?: string;
}
