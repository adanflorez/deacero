import { Observable } from 'rxjs';

import { CallsGateway } from '../../gateway';
import { CallsForm } from '../../models';

export class CallsUseCase {
  constructor(private callsGateway: CallsGateway) {}

  get(): Observable<CallsForm> {
    return this.callsGateway.get();
  }

  update(form: CallsForm): Observable<void> {
    return this.callsGateway.update(form);
  }

  feedbackStatus(): Observable<any> {
    return this.callsGateway.feedbackStatus();
  }

  applyCall(data: CallsForm): Observable<any> {
    return this.callsGateway.applyCall(data);
  }

  saveInFlokzu(): Observable<any> {
    return this.callsGateway.saveInFlokzu();
  }

  status(): Observable<any> {
    return this.callsGateway.status();
  }

  feedback(): Observable<any> {
    return this.callsGateway.feedback();
  }

  updateFeedback(data: unknown): Observable<any> {
    return this.callsGateway.updateFeedback(data);
  }
}
