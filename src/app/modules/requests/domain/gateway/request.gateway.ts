import { Observable } from 'rxjs';

import { Request } from '../models';

export abstract class RequestGateway {
  abstract get(): Observable<Array<Request>>;
  abstract update(
    applicationId: string,
    timeExtension: string
  ): Observable<void>;
}
