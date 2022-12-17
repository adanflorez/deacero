import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiCall = environment.apiCall;
  constructor(private http: HttpClient) {}

  applicateToCall(data: any): Observable<any> {
    return this.http.post<Record<string, unknown>>(
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

  status(): Observable<Response> {
    return this.http.get<Response>(`${this.apiCall}application/status`);
  }
}
