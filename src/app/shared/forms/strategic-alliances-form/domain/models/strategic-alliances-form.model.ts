import Donation from 'src/app/core/models/donation.model';
import Product from 'src/app/core/models/product.model';

export interface StrategicAlliancesForm {
  alliances?: string;
  courses?: string;
  issuesToStrengthen?: string;
  whichTopics?: string;
  previousDonations?: string;
  strategicalAlliances?: string;
  donations?: Donation[];
  products?: Product[];
  comment?: string;
}
