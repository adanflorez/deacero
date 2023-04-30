import {
  GeneralProjectDataEntity,
  LocationEntity,
  ObjectivesEntity,
  PeriodEntity,
  ProjectBudgetEntity,
  ProjectDevelopmentEntity,
  ProjectManagerEntity,
  RatingEntity,
} from 'src/app/infrastructure';

export interface CallsEntity {
  generalProjectData: GeneralProjectDataEntity;
  location: LocationEntity;
  projectManager: ProjectManagerEntity;
  projectDevelopment: ProjectDevelopmentEntity;
  validity: PeriodEntity;
  objectivesAndGoals: ObjectivesEntity;
  projectBudget: ProjectBudgetEntity;
  selfAppraisal: RatingEntity;
}
