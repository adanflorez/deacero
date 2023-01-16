import Donation from 'src/app/core/models/donation.model';
import Product from 'src/app/core/models/product.model';
import { StrategicAllianceActivity } from 'src/app/core/models/strategic-alliances-activity.model';

export interface StrategicAlliancesForm {
  alliances?: string;
  courses?: string;
  issuesToStrengthen?: string;
  whichTopics?: string;
  previousDonations?: string;
  strategicalAlliances?: StrategicAllianceActivity[];
  donations?: Donation[];
  products?: Product[];
  comment?: string;
}
