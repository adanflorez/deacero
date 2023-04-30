import { Observable } from 'rxjs';
import { CallsGateway } from '../gateway';
import { CallsForm } from '../models';

export class CallsUseCase {
  constructor(private callsGateway: CallsGateway) {}

  get(): Observable<CallsForm> {
    return this.callsGateway.get();
  }

  update(form: CallsForm): Observable<void> {
    return this.callsGateway.update(form);
  }
}
