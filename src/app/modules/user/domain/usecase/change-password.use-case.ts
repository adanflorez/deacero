import { Observable } from 'rxjs';

import { ChangePasswordGateway } from '../gateway';
import { ChangePassword } from '../models';

export class ChangePasswordUseCase {
  constructor(private changePasswordGateway: ChangePasswordGateway) {}

  update(): Observable<ChangePassword> {
    return this.changePasswordGateway.update();
  }
}
