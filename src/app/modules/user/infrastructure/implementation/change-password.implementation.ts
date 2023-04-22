import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ChangePassword, ChangePasswordGateway } from '../../domain';

@Injectable()
export class ChangePasswordImplementation extends ChangePasswordGateway {
  apiUser = environment.apiUser;
  constructor(private http: HttpClient) {
    super();
  }

  update(
    currentPassword: string,
    newPassword: string
  ): Observable<ChangePassword> {
    return this.http.put<ChangePassword>(`${this.apiUser}/change-password`, {
      password: newPassword,
      oldPassword: currentPassword,
    });
  }
}
