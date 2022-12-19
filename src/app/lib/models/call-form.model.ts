import GoverningBody from './governing-body.model';
import RemunerationForm from './remuneration-form.model';
import GeneralDataForm from 'src/app/lib/models/general-data-form.model';

export default interface CallForm
  extends GoverningBody,
    RemunerationForm,
    GeneralDataForm {}
