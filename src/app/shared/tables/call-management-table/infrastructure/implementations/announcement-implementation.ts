import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Announcement, AnnouncementGateway } from '../../domain';
import { AnnouncementEntity } from './../driven-adapters';
import { AnnouncementImplementationMapper } from './../helpers';

@Injectable()
export class AnnouncementImplementation extends AnnouncementGateway {
  private apiAnnouncement = environment.apiAnnouncement;
  announcementMapper = new AnnouncementImplementationMapper();

  constructor(private http: HttpClient) {
    super();
  }

  get(
    page: number,
    perPage: number
  ): Observable<{ announcements: Announcement[]; size: number }> {
    return this.http
      .get(`${this.apiAnnouncement}?page=${page}&size=${perPage}`)
      .pipe(
        map((response: any) => {
          const announcements: Array<AnnouncementEntity> =
            response.data.announcements;
          const mappedAnnouncement: Array<Announcement> = announcements.map(
            this.announcementMapper.mapFrom
          );
          return {
            announcements: mappedAnnouncement,
            size: response.data.size,
          };
        })
      );
  }

  create(startDate: string, endDate: string, type: 1 | 2): Observable<void> {
    return this.http
      .post(this.apiAnnouncement, {
        initDate: startDate,
        endDate,
        typeId: Number(type),
      })
      .pipe(map(() => undefined));
  }

  edit(id: string, startDate: string, endDate: string): Observable<void> {
    return this.http
      .put(this.apiAnnouncement, {
        id: Number(id),
        initDate: startDate,
        endDate,
      })
      .pipe(map(() => undefined));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete(`${this.apiAnnouncement}?id=${id}`)
      .pipe(map(() => undefined));
  }
}
