import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BYPASS_AUTH } from '../interceptors/token.interceptor';

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

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiLogin, { username, password }, this.byPASS);
  }

  passwordRecovery(email: string): Observable<any> {
    return this.http.get(
      `${this.apiUser}/recover/password?email=${email}`,
      this.byPASS
    );
  }

  validateUser(
    code: string,
    derivation: string,
    email: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUser}/validate?code=${code}&derivation=${derivation}&email=${email}`,
      this.byPASS
    );
  }
}
