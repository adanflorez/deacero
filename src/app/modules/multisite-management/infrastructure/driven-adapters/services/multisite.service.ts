import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MultisiteResponse, MultisiteUseCase } from './../../../domain';

@Injectable()
export class MultisiteService {
  constructor(private multisiteUseCase: MultisiteUseCase) {}

  get(page: number, perPage: number): Observable<MultisiteResponse> {
    return this.multisiteUseCase.get(page, perPage);
  }

  allowMultisite(siteId: string, allow: boolean) {
    return this.multisiteUseCase.allowMultisite(siteId, allow);
  }
}
