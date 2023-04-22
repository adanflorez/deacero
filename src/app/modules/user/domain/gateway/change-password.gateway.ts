import { Observable } from 'rxjs';

import { ChangePassword } from './../models';

export abstract class ChangePasswordGateway {
  abstract update(
    currentPassword: string,
    newPassword: string
  ): Observable<ChangePassword>;
}
