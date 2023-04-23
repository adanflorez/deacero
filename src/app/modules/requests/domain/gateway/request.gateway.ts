import { Observable } from 'rxjs';

import { Request } from '../models';

export abstract class RequestGateway {
  abstract get(
    page: number,
    perPage: number
  ): Observable<{ requests: Request[]; size: number }>;
  abstract update(
    applicationId: number,
    timeExtension: string
  ): Observable<void>;
}
