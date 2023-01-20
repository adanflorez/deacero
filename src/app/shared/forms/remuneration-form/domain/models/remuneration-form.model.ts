import Remuneration from 'src/app/core/models/remuneration.model';
export interface RemunerationForm {
  remunerationQuestion?: boolean;
  comment?: string;
  remunerations?: Remuneration[];
}
