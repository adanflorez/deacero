import Remuneration from 'src/app/core/models/remuneration.model';
export default interface RemunerationForm {
  remunerationQuestion?: boolean;
  comment?: string;
  remunerations?: Remuneration[];
}
