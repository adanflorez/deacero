import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  private apiMultimedia = environment.apiMultimedia;

  constructor(private http: HttpClient) {}

  upload(formdata: FormData): Observable<any> {
    return this.http.post(`${this.apiMultimedia}`, formdata);
  }
}
