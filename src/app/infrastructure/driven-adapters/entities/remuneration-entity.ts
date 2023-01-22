import { Remuneration } from 'src/app/core/models/remuneration.model';

export interface RemunerationEntity {
  comments: string;
  workInYourOrganizationIsPaid: boolean;
  tableRemunerations: Array<Remuneration>;
}
