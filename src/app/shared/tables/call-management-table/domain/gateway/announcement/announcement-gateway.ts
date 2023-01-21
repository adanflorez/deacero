import { Observable } from 'rxjs';

import { Announcement } from '../../models';

export abstract class AnnouncementGateway {
  abstract get(): Observable<Array<Announcement>>;
  abstract create(
    startDate: string,
    endDate: string,
    type: 1 | 2
  ): Observable<void>;
  abstract edit(
    id: string,
    startDate: string,
    endDate: string
  ): Observable<void>;
  abstract delete(id: string): Observable<void>;
}
