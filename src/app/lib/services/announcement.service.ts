import Announcement from 'src/app/lib/models/announcement.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
              id: announcement.callId,
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
}
