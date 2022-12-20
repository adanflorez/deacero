import { Component, Input, OnInit } from '@angular/core';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import FormValid from 'src/app/lib/models/form-valid.model';
import ProjectBudget from 'src/app/lib/models/project-budget.model';
import ProjectBudgetForm from 'src/app/lib/models/project-budget-form.model';

@Component({
  selector: 'app-project-budget-form',
  templateUrl: './project-budget-form.component.html',
  styleUrls: ['./project-budget-form.component.scss'],
})
export class ProjectBudgetFormComponent implements OnInit {
  @Input() updateParentModel: (
    part: ProjectBudgetForm,
    isFormValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: ProjectBudgetForm;
  contributions: ProjectBudget[];

  constructor() {
    this.contributions = [];
    this.defaultValues = {};
  }

  ngOnInit(): void {
    this.updateContributions(
      this.defaultValues.contributions as ProjectBudget[]
    );
  }

  updateContributions(contributions: ProjectBudget[]) {
    this.contributions = contributions;
    const data = { ...contributions };
    this.updateParentModel({ contributions: data }, this.isValid);
  }

  get isValid(): FormValid {
    return {
      name: CallSection.BUDGET_PROJECT,
      valid: this.contributions.length > 0,
    };
  }
}
