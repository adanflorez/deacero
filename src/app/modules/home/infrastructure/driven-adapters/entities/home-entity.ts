import {
  GoverningBodyEntity,
  RemunerationEntity,
  GeneralDataEntity,
  FundManagerEntity,
  OrganizationalInformationEntity,
  StrategicAlliancesEntity,
  DecentWorkEntity,
} from 'src/app/domain';

export interface HomeEntity {
  governingBody: GoverningBodyEntity;
  remunerations: RemunerationEntity;
  generalData: GeneralDataEntity;
  procuringFunds: FundManagerEntity;
  organizationalInformation: OrganizationalInformationEntity;
  sustainabilityAndStrategic: StrategicAlliancesEntity;
  hardWork: DecentWorkEntity;
}
