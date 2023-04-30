import {
  GeneralProjectDataForm,
  LocationForm,
  ProjectManagerForm,
  ProjectDevelopmentForm,
  PeriodForm,
  ObjectivesForm,
  ProjectBudgetForm,
} from 'src/app/shared/forms';

export interface CallsForm {
  generalProjectData: GeneralProjectDataForm;
  location: LocationForm;
  projectManager: ProjectManagerForm;
  projectDevelopment: ProjectDevelopmentForm;
  period: PeriodForm;
  objectives: ObjectivesForm;
  projectBudget: ProjectBudgetForm;
}
