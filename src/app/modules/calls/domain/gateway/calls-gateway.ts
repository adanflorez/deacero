import { Observable } from 'rxjs';
import { CallsForm } from '../models';

export abstract class CallsGateway {
  abstract get(): Observable<CallsForm>;
  abstract update(form: CallsForm): Observable<void>;
}
