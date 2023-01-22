import { Member } from 'src/app/core/models';
export interface GoverningBodyForm {
  meetings?: number;
  renewalFrequency?: number;
  members?: Member[];
  comment?: string;
}
