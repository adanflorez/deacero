import { Injectable } from '@angular/core';
import { Request, RequestUseCase } from '../../../domain';
import { Observable } from 'rxjs';

@Injectable()
export class RequestService {
  constructor(private requestUseCase: RequestUseCase) {}

  get(
    page: number,
    perPage: number
  ): Observable<{ requests: Request[]; size: number }> {
    return this.requestUseCase.get(page, perPage);
  }
}
