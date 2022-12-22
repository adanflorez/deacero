import GeneralDataForm from 'src/app/lib/models/general-data-form.model';
import FundManagerForm from 'src/app/lib/models/fund-manager-form.model';
import OrganizationalInformationForm from 'src/app/lib/models/organizational-information-form.model';
import StrategicAlliancesForm from 'src/app/lib/models/strategic-alliances-form.model';
import GoverningBody from './governing-body.model';
import LocationForm from './location-form.model';
import RemunerationForm from './remuneration-form.model';
import GeneralProjectDataForm from 'src/app/lib/models/general-project-data-form.model';
import ProjectManagerForm from 'src/app/lib/models/project-manager-form.model';
import ProjectDevelopmentForm from 'src/app/lib/models/project-development-form.model';
import PeriodForm from 'src/app/lib/models/period-form.model';
import SocialMediaForm from 'src/app/lib/models/social-media-form.model';
import ProjectBudgetForm from 'src/app/lib/models/project-budget-form.model';
import DocumentsForm from 'src/app/lib/models/documents-form.model';
import ObjectivesForm from 'src/app/lib/models/objectives-form.model';
import RatingForm from 'src/app/lib/models/rating-form.model';
import DecentWorkForm from 'src/app/lib/models/decent-work-form.model';

export default interface CallForm {
  generalData: GeneralDataForm;
  fundManager: FundManagerForm;
  organizationalInformation: OrganizationalInformationForm;
  strategicAlliances: StrategicAlliancesForm;
  decentWork: DecentWorkForm;
  governingBody: GoverningBody;
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
