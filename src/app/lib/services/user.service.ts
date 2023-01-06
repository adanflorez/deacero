import UserManagement from 'src/app/lib/models/user-management.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Response from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiOSC = environment.apiOSC;
  private apiAdmin = environment.apiAdmin;

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

  userManagementList(): Observable<any> {
    return this.http.get(`${this.apiAdmin}user`).pipe(
      map((response: any) => {
        const users: Array<any> = response.data.users;
        const userManagement: UserManagement[] = users.map(user => {
          return {
            name: user.email,
            rfc: user.businessName,
            role: user.rol,
            status: user.status,
          };
        });
        return userManagement;
      })
    );
  }

  createUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiAdmin}user`, { email, password });
  }
}
