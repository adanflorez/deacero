import {
  Donation,
  Product,
  StrategicAllianceActivity,
} from 'src/app/core/models';

export interface StrategicAlliancesForm {
  alliances?: string;
  courses?: string;
  issuesToStrengthen?: Array<string>;
  whichTopics?: string;
  previousDonations?: boolean;
  strategicalAlliances?: StrategicAllianceActivity[];
  donations?: Donation[];
  products?: Product[];
  comment?: string;
}
