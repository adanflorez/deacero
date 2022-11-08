import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiLogin = environment.apiLogin;
  private apiUser = environment.apiUser;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiLogin, { username, password });
  }

  passwordRecovery(email: string): Observable<any> {
    return this.http.get(`${this.apiUser}/recover/password?email=${email}`);
  }
}
