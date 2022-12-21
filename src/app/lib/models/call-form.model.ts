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

export default interface CallForm
  extends ProjectManagerForm,
    ProjectDevelopmentForm,
    PeriodForm,
    SocialMediaForm,
    ProjectBudgetForm,
    DocumentsForm,
    ObjectivesForm,
    RatingForm {
  governingBody: GoverningBody;
  remuneration: RemunerationForm;
  generalProjectData: GeneralProjectDataForm;
  location: LocationForm;
}
