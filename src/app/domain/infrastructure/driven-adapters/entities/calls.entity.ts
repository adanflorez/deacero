import {
  DocumentsEntity,
  GeneralProjectDataEntity,
  LocationEntity,
  ObjectivesEntity,
  OtherDocumentsEntity,
  PeriodEntity,
  ProjectBudgetEntity,
  ProjectDevelopmentEntity,
  ProjectManagerEntity,
  RatingEntity,
  SocialMediaEntity,
} from 'src/app/domain';

export interface CallsEntity {
  generalProjectData: GeneralProjectDataEntity;
  location: LocationEntity;
  projectManager: ProjectManagerEntity;
  projectDevelopment: ProjectDevelopmentEntity;
  validity: PeriodEntity;
  objectivesAndGoals: ObjectivesEntity;
  projectBudget: ProjectBudgetEntity;
  selfAppraisal: RatingEntity;
  communication: SocialMediaEntity;
  documents: DocumentsEntity;
  loadingDocumentStage: OtherDocumentsEntity;
  portalStatusCode?: number;
}
