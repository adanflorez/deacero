import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Multisite } from 'src/app/modules/multisite-management/domain';
import { environment } from 'src/environments/environment';

@Injectable()
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
