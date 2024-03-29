import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import Response from '../models/response.model';

import { UserModel } from 'src/app/domain/models/user.model';
import { GetUserUseCases } from 'src/app/domain/usecases/user/get-user.usecase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiApplication = environment.apiApplication;
  private apiAdmin = environment.apiAdmin;

  constructor(
    private http: HttpClient,
    private getUserUseCases: GetUserUseCases
  ) {}

  OSCstatus(): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(
      `${this.apiApplication}field/validation/status`
    );
  }

  userManagementList(
    page: number,
    perPage: number
  ): Observable<{ users: UserModel[]; size: number }> {
    return this.getUserUseCases.list(page, perPage);
  }

  createUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiAdmin}user`, { email, password });
  }

  activateOrDeactivateUser(email: string, status: boolean): Observable<any> {
    return this.http.put(
      `${this.apiAdmin}user?email=${email}&status=${status}`,
      {}
    );
  }
}
