import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Announcement, AnnouncementUseCase } from '../../../domain';

@Injectable()
export class AnnouncementService {
  private apiAnnouncement = environment.apiAnnouncement;

  constructor(
    private http: HttpClient,
    private announcementUseCase: AnnouncementUseCase
  ) {}

  get(): Observable<Array<Announcement>> {
    return this.announcementUseCase.get();
  }

  create(startDate: string, endDate: string, type: 1 | 2): Observable<any> {
    return this.announcementUseCase.create(startDate, endDate, type);
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