import {
  GeneralProjectDataEntity,
  LocationEntity,
  ProjectManagerEntity,
} from 'src/app/infrastructure';

export interface CallsEntity {
  generalProjectData: GeneralProjectDataEntity;
  location: LocationEntity;
  projectManager: ProjectManagerEntity;
}
