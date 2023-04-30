import {
  DecentWorkEntity,
  FundManagerEntity,
  GeneralDataEntity,
  GoverningBodyEntity,
  OrganizationalInformationEntity,
  RemunerationEntity,
  StrategicAlliancesEntity,
} from 'src/app/infrastructure';

export interface CallsEntity {
  governingBody: GoverningBodyEntity;
  remunerations: RemunerationEntity;
  generalData: GeneralDataEntity;
  procuringFunds: FundManagerEntity;
  organizationalInformation: OrganizationalInformationEntity;
  sustainabilityAndStrategic: StrategicAlliancesEntity;
  hardWork: DecentWorkEntity;
}
