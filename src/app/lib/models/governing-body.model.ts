import Member from 'src/app/lib/models/member.model';
export default interface GoverningBody {
  meetings?: number;
  renewalFrequency?: number;
  members?: Member[];
}
