import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import ProjectBudget from 'src/app/core/models/project-budget.model';
import { AlertType } from 'src/app/shared/alert';

import { ProjectBudgetForm } from './domain';

@Component({
  selector: 'app-project-budget-form',
  templateUrl: './project-budget-form.component.html',
  styleUrls: ['./project-budget-form.component.scss'],
})
export class ProjectBudgetFormComponent implements OnInit, OnChanges {
  @Input() updateParentModel: (
    part: ProjectBudgetForm,
    isFormValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: ProjectBudgetForm;
  @Input() disable: boolean;
  contributions: ProjectBudget[];
  conversions: ProjectBudget[];
  donations: ProjectBudget[];
  alertType: AlertType = AlertType.Warning;

  constructor() {
    this.contributions = [];
    this.conversions = [];
    this.donations = [];
    this.defaultValues = {};
    this.disable = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disable } = changes;
    if (disable?.currentValue) {
      this.initTables();
    }
  }

  ngOnInit(): void {
    this.initTables();
  }

  private initTables() {
    this.updateDonations(this.defaultValues.donations as ProjectBudget[]);
    this.updateContributions(
      this.defaultValues.contributions as ProjectBudget[]
    );
    this.updateConversions(this.defaultValues.conversions as ProjectBudget[]);
  }

  updateContributions(contributions: ProjectBudget[]) {
    this.contributions = contributions || [];
    this.updateParentModel(
      {
        contributions: this.contributions,
        conversions: this.conversions,
        donations: this.donations,
      },
      this.isValid
    );
  }

  updateConversions(conversions: ProjectBudget[]) {
    this.conversions = conversions || [];
    this.updateParentModel(
      {
        contributions: this.contributions,
        conversions: this.conversions,
        donations: this.donations,
      },
      this.isValid
    );
  }

  updateDonations(donations: ProjectBudget[]) {
    this.donations = donations || [];
    this.updateParentModel(
      {
        contributions: this.contributions,
        conversions: this.conversions,
        donations: this.donations,
      },
      this.isValid
    );
  }

  get isValid(): FormValid {
    return {
      name: CallSection.BUDGET_PROJECT,
      valid: this.contributions?.length > 0 && this.conversions?.length > 0,
    };
  }
}
