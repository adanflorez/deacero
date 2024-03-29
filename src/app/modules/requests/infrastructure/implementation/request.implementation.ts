import { RequestEntity } from './../driven-adapters';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Request, RequestGateway } from '../../domain';
import { environment } from 'src/environments/environment';
import { RequestImplementationMapper } from '../helpers';

@Injectable()
export class RequestImplementation extends RequestGateway {
  apiAdmin = environment.apiAdmin;
  requestMapper = new RequestImplementationMapper();

  constructor(private http: HttpClient) {
    super();
  }

  get(
    page: number,
    perPage: number
  ): Observable<{ requests: Request[]; size: number }> {
    return this.http
      .get(`${this.apiAdmin}user/application?page=${page}&size=${perPage}`)
      .pipe(
        map((response: any) => {
          const requests: Array<RequestEntity> = response.data.calls;
          const mappedRequests: Array<Request> = requests.map(
            this.requestMapper.mapFrom
          );
          return { requests: mappedRequests, size: response.data.size };
        })
      );
  }

  update(applicationId: number, timeExtension: string): Observable<void> {
    return this.http
      .put(
        `${this.apiAdmin}user/application?applicationId=${applicationId}&timeExtension=${timeExtension}`,
        {}
      )
      .pipe(map(() => undefined));
  }
}
