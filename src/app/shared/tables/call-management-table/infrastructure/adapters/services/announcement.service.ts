import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Announcement } from '../../../domain';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private apiAnnouncement = environment.apiAnnouncement;

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(this.apiAnnouncement).pipe(
      map((response: any) => {
        const announcements: Array<any> = response.data.announcements;
        const userManagement: Announcement[] = announcements.map(
          announcement => {
            return {
              id: announcement.id,
              callId: announcement.callId,
              type: announcement.type,
              year: announcement.year,
              number: announcement.callNumber,
              startDate: announcement.initDate,
              endRegisterDate: announcement.endDate,
              status: announcement.status,
            };
          }
        );
        return userManagement;
      })
    );
  }

  create(startDate: string, endDate: string, type: 1 | 2): Observable<any> {
    return this.http.post(this.apiAnnouncement, {
      initDate: startDate,
      endDate,
      typeId: Number(type),
    });
  }

  edit(id: string, startDate: string, endDate: string): Observable<any> {
    return this.http.put(this.apiAnnouncement, {
      id: Number(id),
      initDate: startDate,
      endDate,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiAnnouncement}?id=${id}`);
  }
}
