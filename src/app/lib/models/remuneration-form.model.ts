import Remuneration from 'src/app/lib/models/remuneration.model';
export default interface RemunerationForm {
  remunerationQuestion?: boolean;
  comment?: string;
  remunerations?: Remuneration[];
}
