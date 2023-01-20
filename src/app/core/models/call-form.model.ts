import ProjectBudgetForm from 'src/app/core/models/project-budget-form.model';
import ProjectDevelopmentForm from 'src/app/core/models/project-development-form.model';
import ProjectManagerForm from 'src/app/core/models/project-manager-form.model';
import RatingForm from 'src/app/core/models/rating-form.model';
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
