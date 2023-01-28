import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Multisite } from 'src/app/modules/multisite-management/domain';

import { MultisiteUseCase } from './../../../domain';

@Injectable()
export class MultisiteService {
  constructor(private multisiteUseCase: MultisiteUseCase) {}

  get(page: number, perPage: number): Observable<Multisite[]> {
    return this.multisiteUseCase.get(page, perPage);
  }

  allowMultisite(siteId: string, allow: boolean) {
    return this.multisiteUseCase.allowMultisite(siteId, allow);
  }
}
