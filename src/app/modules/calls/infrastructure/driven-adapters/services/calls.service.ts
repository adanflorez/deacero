import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CallsUseCase, CallsForm } from '../../../domain';

@Injectable()
export class CallsService {
  constructor(private callsUseCase: CallsUseCase) {}

  get(): Observable<CallsForm> {
    return this.callsUseCase.get();
  }

  update(form: CallsForm): Observable<void> {
    return this.callsUseCase.update(form);
  }
}
