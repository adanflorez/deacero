import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Announcement, AnnouncementUseCase } from '../../../domain';

@Injectable()
export class AnnouncementService {
  constructor(private announcementUseCase: AnnouncementUseCase) {}

  get(
    page: number,
    perPage: number
  ): Observable<{ announcements: Announcement[]; size: number }> {
    return this.announcementUseCase.get(page, perPage);
  }

  create(startDate: string, endDate: string, type: 1 | 2): Observable<void> {
    return this.announcementUseCase.create(startDate, endDate, type);
  }

  edit(id: string, startDate: string, endDate: string): Observable<void> {
    return this.announcementUseCase.edit(id, startDate, endDate);
  }

  delete(id: string): Observable<void> {
    return this.announcementUseCase.delete(id);
  }
}
