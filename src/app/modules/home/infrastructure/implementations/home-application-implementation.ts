import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HomeApplicationGateway, HomeForm } from '../../domain';
import { HomeEntity } from './../driven-adapters';
import { HomeApplicationImplementationMapper } from '../helpers';

@Injectable()
export class HomeApplicationImplementation extends HomeApplicationGateway {
  private apiApplication = environment.apiApplication;
  private homeApplicationMapper = new HomeApplicationImplementationMapper();
  constructor(private http: HttpClient) {
    super();
  }

  get(): Observable<HomeForm> {
    return this.http.get(`${this.apiApplication}`).pipe(
      map((response: any) => {
        const application: HomeEntity = response.data;
        const mappedApplication: HomeForm =
          this.homeApplicationMapper.mapFrom(application);
        return mappedApplication;
      })
    );
  }

  override update(form: HomeForm): Observable<void> {
    return this.http
      .post(`${this.apiApplication}`, this.homeApplicationMapper.mapTo(form))
      .pipe(map(() => undefined));
  }
}
