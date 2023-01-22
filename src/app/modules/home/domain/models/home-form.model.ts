import {
  FundManagerForm,
  GeneralDataForm,
  RemunerationForm,
  GoverningBodyForm,
  OrganizationalInformationForm,
  StrategicAlliancesForm,
  DecentWorkForm,
} from 'src/app/shared/forms';

export interface HomeForm {
  governingBody: GoverningBodyForm;
  remuneration: RemunerationForm;
  generalData: GeneralDataForm;
  fundManager: FundManagerForm;
  organizationalInformation: OrganizationalInformationForm;
  strategicAlliances: StrategicAlliancesForm;
  decentWork: DecentWorkForm;
}
