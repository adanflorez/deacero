import { Observable } from 'rxjs';

import { AnnouncementGateway } from '../../gateway';
import { Announcement } from '../../models';

export class CreateAnnouncementUseCase {
  constructor(private announcementGateway: AnnouncementGateway) {}

  create(
    startDate: string,
    endDate: string,
    type: 1 | 2
  ): Observable<Array<Announcement>> {
    return this.announcementGateway.create(startDate, endDate, type);
  }
}
