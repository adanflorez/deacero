import {
  GeneralProjectDataEntity,
  LocationEntity,
  ObjectivesEntity,
  PeriodEntity,
  ProjectBudgetEntity,
  ProjectDevelopmentEntity,
  ProjectManagerEntity,
} from 'src/app/infrastructure';

export interface CallsEntity {
  generalProjectData: GeneralProjectDataEntity;
  location: LocationEntity;
  projectManager: ProjectManagerEntity;
  projectDevelopment: ProjectDevelopmentEntity;
  validity: PeriodEntity;
  objectivesAndGoals: ObjectivesEntity;
  projectBudget: ProjectBudgetEntity;
}
