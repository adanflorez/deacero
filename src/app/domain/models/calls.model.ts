import {
  GeneralProjectDataForm,
  LocationForm,
  ProjectManagerForm,
  ProjectDevelopmentForm,
  PeriodForm,
  ObjectivesForm,
  ProjectBudgetForm,
  RatingForm,
  SocialMediaForm,
  DocumentsForm,
  OtherDocumentsForm,
} from 'src/app/shared/forms';

export interface CallsForm {
  generalProjectData: GeneralProjectDataForm;
  location: LocationForm;
  projectManager: ProjectManagerForm;
  projectDevelopment: ProjectDevelopmentForm;
  period: PeriodForm;
  objectives: ObjectivesForm;
  projectBudget: ProjectBudgetForm;
  rating: RatingForm;
  communication: SocialMediaForm;
  documents: DocumentsForm;
  otherDocuments: OtherDocumentsForm;
  status: number;
}
