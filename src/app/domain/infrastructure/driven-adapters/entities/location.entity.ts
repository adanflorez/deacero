import { OpeningHours } from 'src/app/shared/tables/opening-hours-table';

export interface LocationEntity {
  comments: string;
  locationIsVirtual: boolean;
  streetAndNumber: string;
  colony: string;
  municipality: string;
  status: string;
  postalCode: string;
  urlProyect: string;
  daysAndHoursOfAttention: Array<OpeningHours>;
  howDidYouFindOutAboutTheCall: string[];
  whichMeans: string;
}
