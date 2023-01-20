import Member from 'src/app/core/models/member.model';
export interface GoverningBodyForm {
  meetings?: number;
  renewalFrequency?: number;
  members?: Member[];
  comment?: string;
}
