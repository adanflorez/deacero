import { Observable } from 'rxjs';

import { Multisite } from '../models';

export abstract class MultisiteGateway {
  abstract get(page: number, perPage: number): Observable<Array<Multisite>>;
  abstract allowMultisite(siteId: string, allow: boolean): Observable<void>;
}
