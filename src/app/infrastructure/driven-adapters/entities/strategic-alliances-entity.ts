import {
  Donation,
  Product,
  StrategicAllianceActivity,
} from 'src/app/core/models';

export interface StrategicAlliancesEntity {
  donation: Array<Donation>;
  product: Array<Product>;
  recibioUnaDonacion: boolean;
  actividadesEspecificasFDA: Array<StrategicAllianceActivity>;
  temasAFortalecer: Array<string>;
  temasDescripcion: string;
  redDeAlianzas: string;
  listaCursosDeActualizacion: string;
}
