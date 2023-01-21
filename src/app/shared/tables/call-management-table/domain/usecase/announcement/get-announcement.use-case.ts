import { Observable } from 'rxjs';

import { AnnouncementGateway } from '../../gateway';
import { Announcement } from '../../models';

export class GetAnnouncementUseCase {
  constructor(private announcementGateway: AnnouncementGateway) {}

  get(): Observable<Array<Announcement>> {
    return this.announcementGateway.get();
  }
}
