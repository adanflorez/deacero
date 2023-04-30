import {
  GeneralProjectDataEntity,
  LocationEntity,
} from 'src/app/infrastructure';

export interface CallsEntity {
  generalProjectData: GeneralProjectDataEntity;
  location: LocationEntity;
}
