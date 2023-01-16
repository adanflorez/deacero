import { StrategicAllianceActivity } from 'src/app/lib/models/strategic-alliances-activity.model';
import Donation from './donation.model';
import Product from './product.model';

export default interface StrategicAlliancesForm {
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
