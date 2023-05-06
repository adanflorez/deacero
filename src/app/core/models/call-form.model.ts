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
  OtherDocumentsForm,
  PeriodForm,
  ProjectBudgetForm,
  ProjectDevelopmentForm,
  ProjectManagerForm,
  RatingForm,
  RemunerationForm,
  SocialMediaForm,
  StrategicAlliancesForm,
} from 'src/app/shared/forms';

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
  otherDocuments: OtherDocumentsForm;
}
