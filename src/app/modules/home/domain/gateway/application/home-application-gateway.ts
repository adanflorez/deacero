import { Observable } from 'rxjs';

import { HomeForm } from '../../models';

export abstract class HomeApplicationGateway {
  abstract get(): Observable<HomeForm>;
  abstract update(form: HomeForm): Observable<void>;
}
