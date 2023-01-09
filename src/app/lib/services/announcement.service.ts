import { Observable } from 'rxjs';
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
    return this.http.get(this.apiAnnouncement);
  }
}
