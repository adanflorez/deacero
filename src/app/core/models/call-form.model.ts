import StrategicAlliancesForm from 'src/app/core/models/strategic-alliances-form.model';
import {
  DecentWorkForm,
  DocumentsForm,
  FundManagerForm,
  GeneralDataForm,
  GeneralProjectDataForm,
  GoverningBodyForm,
  LocationForm,
  ObjectivesForm,
  OrganizationalInformationForm,
  PeriodForm,
  ProjectBudgetForm,
  ProjectDevelopmentForm,
  ProjectManagerForm,
  RatingForm,
  SocialMediaForm,
} from 'src/app/shared/forms';

import RemunerationForm from './remuneration-form.model';

export default interface CallForm {
  generalData: GeneralDataForm;
  fundManager: FundManagerForm;
  organizationalInformation: OrganizationalInformationForm;
  strategicAlliances: StrategicAlliancesForm;
  decentWork: DecentWorkForm;
  governingBody: GoverningBodyForm;
  remuneration: RemunerationForm;
  generalProjectData: GeneralProjectDataForm;
  location: LocationForm;
  projectManager: ProjectManagerForm;
  projectDevelopment: ProjectDevelopmentForm;
  period: PeriodForm;
  communication: SocialMediaForm;
  projectBudget: ProjectBudgetForm;
  objectives: ObjectivesForm;
  documents: DocumentsForm;
  rating: RatingForm;
}
