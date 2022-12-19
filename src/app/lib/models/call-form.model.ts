import GoverningBody from './governing-body.model';
import LocationForm from './location-form.model';
import RemunerationForm from './remuneration-form.model';
import GeneralDataForm from 'src/app/lib/models/general-data-form.model';
import ProjectManagerForm from 'src/app/lib/models/project-manager-form.model';
import ProjectDevelopmentForm from 'src/app/lib/models/project-development-form.model';
import PeriodForm from 'src/app/lib/models/period-form.model';

export default interface CallForm
  extends GoverningBody,
    RemunerationForm,
    GeneralDataForm,
    LocationForm,
    ProjectManagerForm,
    ProjectDevelopmentForm,
    PeriodForm {}
