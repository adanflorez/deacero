import { Mapper } from 'src/app/base/utils/mapper';

import { Announcement } from '../../../domain';
import { AnnouncementEntity } from './../../driven-adapters';

export class AnnouncementImplementationMapper extends Mapper<
  AnnouncementEntity,
  Announcement
> {
  mapFrom(param: AnnouncementEntity): Announcement {
    return {
      id: param.id,
      callId: param.callId,
      type: param.type,
      year: param.year,
      number: param.callNumber,
      startDate: param.initDate,
      endRegisterDate: param.endDate,
      status: param.status,
    };
  }
  mapTo(param: Announcement): AnnouncementEntity {
    return {
      id: param.id,
      callId: param.callId,
      type: param.type,
      year: param.year,
      callNumber: param.number,
      initDate: param.startDate,
      endDate: param.endRegisterDate,
      status: param.status,
    };
  }
}
