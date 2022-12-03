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
    return this.http.post(`${this.apiCall}application/`, data);
  }

  application() {
    return this.http.get(`${this.apiCall}application/`);
  }
}
