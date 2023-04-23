import { Observable } from 'rxjs';

import { RequestGateway } from '../gateway';
import { Request } from '../models';

export class RequestUseCase {
  constructor(private requestGateway: RequestGateway) {}

  get(
    page: number,
    perPage: number
  ): Observable<{ requests: Request[]; size: number }> {
    return this.requestGateway.get(page, perPage);
  }

  update(applicationId: number, timeExtension: string): Observable<void> {
    return this.requestGateway.update(applicationId, timeExtension);
  }
}
