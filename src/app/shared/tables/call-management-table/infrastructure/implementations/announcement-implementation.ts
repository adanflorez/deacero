import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Announcement, AnnouncementGateway } from '../../domain';
import { AnnouncementEntity } from './../driven-adapters/entities/announcement-entity';
import { AnnouncementImplementationMapper } from './../helpers/maps/announcement-mapper';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementImplementation extends AnnouncementGateway {
  private apiAnnouncement = environment.apiAnnouncement;
  announcementMapper = new AnnouncementImplementationMapper();

  constructor(private http: HttpClient) {
    super();
  }

  get(): Observable<Announcement[]> {
    return this.http.get(this.apiAnnouncement).pipe(
      map((response: any) => {
        const announcements: Array<any> = response.data.announcements;
        const userManagement: AnnouncementEntity[] = announcements.map(
          announcement => this.announcementMapper.mapFrom(announcement)
        );
        return userManagement;
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
}
