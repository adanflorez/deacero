import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Response from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiOSC = environment.apiOSC;

  constructor(private http: HttpClient) {}

  updateOSC(form: unknown): Observable<Response<unknown>> {
    return this.http.put<Response<unknown>>(`${this.apiOSC}`, form);
  }

  getOSC(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(`${this.apiOSC}`);
  }

  OSCstatus(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(`${this.apiOSC}status`);
  }
}
