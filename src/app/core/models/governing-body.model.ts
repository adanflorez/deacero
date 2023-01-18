import Member from 'src/app/core/models/member.model';
export default interface GoverningBody {
  meetings?: number;
  renewalFrequency?: number;
  members?: Member[];
  comment?: string;
}
