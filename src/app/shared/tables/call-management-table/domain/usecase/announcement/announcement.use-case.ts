import { Observable } from 'rxjs';

import { AnnouncementGateway } from '../../gateway';
import { Announcement } from '../../models';

export class AnnouncementUseCase {
  constructor(private announcementGateway: AnnouncementGateway) {}

  get(
    page: number,
    perPage: number
  ): Observable<{ announcements: Announcement[]; size: number }> {
    return this.announcementGateway.get(page, perPage);
  }

  create(startDate: string, endDate: string, type: 1 | 2): Observable<void> {
    return this.announcementGateway.create(startDate, endDate, type);
  }

  edit(id: string, startDate: string, endDate: string): Observable<void> {
    return this.announcementGateway.edit(id, startDate, endDate);
  }

  delete(id: string): Observable<void> {
    return this.announcementGateway.delete(id);
  }
}
