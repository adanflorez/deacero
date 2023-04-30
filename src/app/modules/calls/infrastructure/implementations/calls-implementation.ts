import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CallsGateway, CallsForm } from '../../domain';
import { CallsEntity } from '../driven-adapters';
import { CallsImplementationMapper } from '../helpers';

@Injectable()
export class CallsImplementation extends CallsGateway {
  private apiApplication = environment.apiApplication;
  private callsMapper = new CallsImplementationMapper();
  constructor(private http: HttpClient) {
    super();
  }

  get(): Observable<CallsForm> {
    return this.http.get(`${this.apiApplication}`).pipe(
      map((response: any) => {
        const application: CallsEntity = response.data;
        const mappedApplication: CallsForm =
          this.callsMapper.mapFrom(application);
        return mappedApplication;
      })
    );
  }

  override update(form: CallsForm): Observable<void> {
    return this.http
      .post(`${this.apiApplication}`, this.callsMapper.mapTo(form))
      .pipe(map(() => undefined));
  }
}
