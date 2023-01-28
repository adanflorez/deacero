import { Observable } from 'rxjs';

import { MultisiteGateway } from '../gateway';
import { Multisite } from '../models';

export class MultisiteUseCase {
  constructor(private multisiteGateway: MultisiteGateway) {}

  get(page: number, perPage: number): Observable<Array<Multisite>> {
    return this.multisiteGateway.get(page, perPage);
  }

  allowMultisite(siteId: string, allow: boolean): Observable<void> {
    return this.multisiteGateway.allowMultisite(siteId, allow);
  }
}
