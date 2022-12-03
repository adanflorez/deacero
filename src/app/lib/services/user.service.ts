import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiOSC = environment.apiOSC;

  constructor(private http: HttpClient) {}

  updateOSC(form: any): Observable<any> {
    return this.http.put(`${this.apiOSC}`, form);
  }

  getOSC(): Observable<any> {
    return this.http.get(`${this.apiOSC}`);
  }

  OSCstatus(): Observable<any> {
    return this.http.get(`${this.apiOSC}status`);
  }
}
