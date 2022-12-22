import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Response from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiCall = environment.apiCall;
  private apiFeedback = environment.apiFeedback;
  constructor(private http: HttpClient) {}

  applicateToCall(data: unknown): Observable<Response<unknown>> {
    return this.http.post<Response<unknown>>(
      `${this.apiCall}application/`,
      data
    );
  }

  application() {
    return this.http.get(`${this.apiCall}application/`);
  }

  saveInFlokzu() {
    return this.http.put(`${this.apiCall}application/send`, {});
  }

  status(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(
      `${this.apiCall}application/status`
    );
  }

  feedback(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(`${this.apiFeedback}`);
  }

  updateFeedback(form: unknown): Observable<Response<unknown>> {
    return this.http.put<Response<unknown>>(`${this.apiFeedback}`, {
      form,
    });
  }

  feedbackStatus(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(`${this.apiFeedback}status`);
  }
}
