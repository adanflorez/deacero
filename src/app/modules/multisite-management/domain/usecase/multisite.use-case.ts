import { Observable } from 'rxjs';

import { MultisiteGateway } from '../gateway';
import { Multisite } from '../models';

export class AnnouncementUseCase {
  constructor(private multisiteGateway: MultisiteGateway) {}

  get(page = 0, perPage = 5): Observable<Array<Multisite>> {
    return this.multisiteGateway.get(page, perPage);
  }
}
