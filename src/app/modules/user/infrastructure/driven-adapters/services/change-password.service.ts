import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ChangePassword, ChangePasswordUseCase } from '../../../domain';

@Injectable()
export class ChangePasswordService {
  constructor(private changePasswordUseCase: ChangePasswordUseCase) {}

  update(
    currentPassword: string,
    newPassword: string
  ): Observable<ChangePassword> {
    return this.changePasswordUseCase.update(currentPassword, newPassword);
  }
}
