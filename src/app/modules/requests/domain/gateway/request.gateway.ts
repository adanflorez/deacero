import { Observable } from 'rxjs';

import { Request } from '../models';

export abstract class RequestGateway {
  abstract get(): Observable<Array<Request>>;
  abstract update(
    applicationId: number,
    timeExtension: string
  ): Observable<void>;
}
