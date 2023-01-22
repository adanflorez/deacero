import { Remuneration } from 'src/app/core/models';

export interface RemunerationForm {
  remunerationQuestion?: boolean;
  comment?: string;
  remunerations?: Remuneration[];
}
