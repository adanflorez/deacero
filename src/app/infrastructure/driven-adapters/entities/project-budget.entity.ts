import ProjectBudget from 'src/app/core/models/project-budget.model';

export interface ProjectBudgetEntity {
  comments: string;
  organizationContribution: ProjectBudget[];
  jointVenture: ProjectBudget[];
  donationDeaceroFoundation: ProjectBudget[];
}
