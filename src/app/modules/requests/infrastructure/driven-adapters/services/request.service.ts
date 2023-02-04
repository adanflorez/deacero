import { Injectable } from '@angular/core';
import { Request, RequestUseCase } from '../../../domain';
import { Observable } from 'rxjs';

@Injectable()
export class RequestService {
  constructor(private requestUseCase: RequestUseCase) {}

  get(): Observable<Array<Request>> {
    return this.requestUseCase.get();
  }
}
