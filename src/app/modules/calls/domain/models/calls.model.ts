import {
  GeneralProjectDataForm,
  LocationForm,
  ProjectManagerForm,
  ProjectDevelopmentForm,
  PeriodForm,
} from 'src/app/shared/forms';

export interface CallsForm {
  generalProjectData: GeneralProjectDataForm;
  location: LocationForm;
  projectManager: ProjectManagerForm;
  projectDevelopment: ProjectDevelopmentForm;
  period: PeriodForm;
}
