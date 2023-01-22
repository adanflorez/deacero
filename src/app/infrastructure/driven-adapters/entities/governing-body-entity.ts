import { Member } from 'src/app/core/models';

export interface GoverningBodyEntity {
  comments: string;
  boardRenewalFrequency: number;
  membersOfTheGoverning: Array<Member>;
  numberOfMeetingsPerYear: number;
}
