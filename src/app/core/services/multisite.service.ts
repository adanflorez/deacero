import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Multisite } from 'src/app/core/models/multisite.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MultisiteService {
  apiAdmin = environment.apiAdmin;

  constructor(private http: HttpClient) {}

  get(page = 0, perPage = 5): Observable<Multisite[]> {
    return this.http
      .get(`${this.apiAdmin}osc?page=${page}&size=${perPage}`)
      .pipe(
        map((response: any) => {
          return response.data.multiSite;
        })
      );
  }
}
