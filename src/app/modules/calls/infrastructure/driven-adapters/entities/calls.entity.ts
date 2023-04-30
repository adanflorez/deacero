import {
  GeneralProjectDataEntity,
  LocationEntity,
  ProjectDevelopmentEntity,
  ProjectManagerEntity,
} from 'src/app/infrastructure';

export interface CallsEntity {
  generalProjectData: GeneralProjectDataEntity;
  location: LocationEntity;
  projectManager: ProjectManagerEntity;
  projectDevelopment: ProjectDevelopmentEntity;
}
