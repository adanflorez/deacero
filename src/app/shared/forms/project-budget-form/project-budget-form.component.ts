import { Component } from '@angular/core';
import ProjectBudget from 'src/app/lib/models/project-budget.model';

@Component({
  selector: 'app-project-budget-form',
  templateUrl: './project-budget-form.component.html',
  styleUrls: ['./project-budget-form.component.scss'],
})
export class ProjectBudgetFormComponent {
  contributions: ProjectBudget[];

  constructor() {
    this.contributions = [];
  }
}
