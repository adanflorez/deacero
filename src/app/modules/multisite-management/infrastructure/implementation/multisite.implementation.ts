import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Multisite, MultisiteGateway, MultisiteResponse } from '../../domain';
import { MultisiteImplementationMapper } from '../helpers';
import { MultisiteEntity } from './../driven-adapters/entities/multisite.entity';

@Injectable()
export class MultisiteImplementation extends MultisiteGateway {
  apiAdmin = environment.apiAdmin;
  multisiteMapper = new MultisiteImplementationMapper();
  constructor(private http: HttpClient) {
    super();
  }

  get(page: number, perPage: number): Observable<MultisiteResponse> {
    return this.http
      .get(`${this.apiAdmin}osc?page=${page}&size=${perPage}`)
      .pipe(
        map((response: any) => {
          const multisites: Array<MultisiteEntity> = response.data.multiSite;
          const mappedMultisite: Array<Multisite> = multisites.map(
            this.multisiteMapper.mapFrom
          );
          return { sites: mappedMultisite, total: response.data.size };
        })
      );
  }

  allowMultisite(siteId: string, allow: boolean): Observable<void> {
    return this.http
      .put(`${this.apiAdmin}osc?id=${siteId}&status=${allow}`, {})
      .pipe(map(() => undefined));
  }
}
