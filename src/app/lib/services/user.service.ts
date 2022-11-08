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

  updateOSC(osc: string): Observable<any> {
    return this.http.put(`${this.apiOSC}`, { razonSocial: osc });
  }
}
