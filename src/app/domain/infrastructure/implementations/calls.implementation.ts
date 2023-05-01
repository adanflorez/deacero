import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CallsGateway } from '../../gateway';
import { CallsEntity, CallsImplementationMapper } from '../../infrastructure';
import { CallsForm } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CallsImplementation extends CallsGateway {
  private apiFeedback = environment.apiFeedback;
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

  update(form: CallsForm): Observable<void> {
    return this.http
      .post(`${this.apiApplication}`, this.callsMapper.mapTo(form))
      .pipe(map(() => undefined));
  }

  applyCall(data: CallsForm): Observable<any> {
    return this.http.post(
      `${this.apiApplication}`,
      this.callsMapper.mapTo(data)
    );
  }

  application() {
    return this.http.get(`${this.apiApplication}`);
  }

  saveInFlokzu() {
    return this.http.put(`${this.apiApplication}send`, {});
  }

  status(): Observable<any> {
    return this.http.get(`${this.apiApplication}send/request/status`);
  }

  feedback(): Observable<any> {
    return this.http.get(`${this.apiApplication}`);
  }

  updateFeedback(form: unknown): Observable<any> {
    return this.http.post(`${this.apiApplication}`, form);
  }

  feedbackStatus(): Observable<any> {
    return this.http.get(`${this.apiFeedback}status`);
  }
}
