import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BYPASS_AUTH } from '../interceptors/token.interceptor';
import Response from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiLogin = environment.apiLogin;
  private apiUser = environment.apiUser;
  private apiRegister = environment.apiRegister;

  protected readonly byPASS = {
    context: new HttpContext().set(BYPASS_AUTH, true),
  };

  constructor(private http: HttpClient) {}

  signup(username: string, password: string, rfc: string) {
    return this.http.post(
      this.apiRegister,
      {
        correoElectronico: username,
        rfc,
        clave: password,
      },
      this.byPASS
    );
  }

  login(username: string, password: string): Observable<Response<unknown>> {
    return this.http.post<Response<unknown>>(
      this.apiLogin,
      { username, password },
      this.byPASS
    );
  }

  passwordRecovery(email: string): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(
      `${this.apiUser}/recover/password?email=${email}`,
      this.byPASS
    );
  }

  validateUser(
    code: string,
    derivation: string,
    email: string
  ): Observable<Response<unknown>> {
    return this.http.get<Response<unknown>>(
      `${this.apiUser}/validate?code=${code}&derivation=${derivation}&email=${email}`,
      this.byPASS
    );
  }

  validateRFCExists(rfc: string): Observable<boolean> {
    return this.http
      .get<Response<unknown>>(`${this.apiRegister}?rfc=${rfc}`)
      .pipe(
        map((res: any) => {
          return res.data as boolean;
        })
      );
  }
}
