import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Response from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  private apiMultimedia = environment.apiMultimedia;

  constructor(private http: HttpClient) {}

  upload(formdata: FormData): Observable<Response<unknown>> {
    return this.http.post<Response<unknown>>(`${this.apiMultimedia}`, formdata);
  }
}
