import { Observable } from 'rxjs';
import { CallsForm } from '../models';

export abstract class CallsGateway {
  abstract get(): Observable<CallsForm>;
  abstract update(form: CallsForm): Observable<void>;
  abstract feedbackStatus(): Observable<any>;
  abstract applyCall(data: unknown): Observable<any>;
  abstract saveInFlokzu(): Observable<any>;
  abstract status(): Observable<any>;
  abstract feedback(): Observable<any>;
  abstract updateFeedback(data: unknown): Observable<any>;
}
