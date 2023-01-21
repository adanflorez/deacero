import { Observable } from 'rxjs';

import { Announcement } from '../../models';

export abstract class AnnouncementGateway {
  abstract get(): Observable<Array<Announcement>>;
  abstract create(
    startDate: string,
    endDate: string,
    type: 1 | 2
  ): Observable<void>;
}
