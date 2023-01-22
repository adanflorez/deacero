import { OpeningHours } from 'src/app/shared/tables/opening-hours-table/';

export interface LocationForm {
  locationQuestion?: boolean;
  street?: string;
  colony?: string;
  town?: string;
  state?: string;
  postalCode?: string;
  video?: string;
  daysAndHours?: Array<OpeningHours>;
  aboutCall?: string;
  whichMedia?: string;
  comment?: string;
}
