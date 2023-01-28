import { Observable } from 'rxjs';

import { MultisiteResponse } from './../models';

export abstract class MultisiteGateway {
  abstract get(page: number, perPage: number): Observable<MultisiteResponse>;
  abstract allowMultisite(siteId: string, allow: boolean): Observable<void>;
}
