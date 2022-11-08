import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiLogin = environment.apiLogin;
  private apiUser = environment.apiUser;
  private apiRegister = environment.apiRegister;

  constructor(private http: HttpClient) {}

  signup(username: string, password: string, rfc: string) {
    return this.http.post(this.apiRegister, {
      correoElectronico: username,
      rfc,
      clave: password,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiLogin, { username, password });
  }

  passwordRecovery(email: string): Observable<any> {
    return this.http.get(`${this.apiUser}/recover/password?email=${email}`);
  }

  validateUser(
    code: string,
    derivation: string,
    email: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUser}/validate?code=${code}&derivation=${derivation}&email=${email}`
    );
  }
}
