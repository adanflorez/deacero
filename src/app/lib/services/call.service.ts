import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Response from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiFeedback = environment.apiFeedback;
  private apiApplication = environment.apiApplication;
  constructor(private http: HttpClient) {}

  applicateToCall(data: unknown): Observable<Response<unknown>> {
    return this.http.post<Response<unknown>>(`${this.apiApplication}`, data);
  }

  application() {
    return this.http.get(`${this.apiApplication}`);
  }

  saveInFlokzu() {
    return this.http.put(`${this.apiApplication}send`, {});
  }

  status(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(
      `${this.apiApplication}send/request/status`
    );
  }

  feedback(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(`${this.apiApplication}`);
  }

  updateFeedback(form: unknown): Observable<Response<unknown>> {
    return this.http.put<Response<unknown>>(`${this.apiApplication}`, form);
  }

  feedbackStatus(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(`${this.apiFeedback}status`);
  }
}
