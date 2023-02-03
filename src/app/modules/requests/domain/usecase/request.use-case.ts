import { Observable } from 'rxjs';

import { RequestGateway } from '../gateway';
import { Request } from '../models';

export class RequestUseCase {
  constructor(private requestGateway: RequestGateway) {}

  get(): Observable<Array<Request>> {
    return this.requestGateway.get();
  }
}
