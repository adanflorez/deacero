import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public role(): Observable<unknown> {
    const role = localStorage.getItem('role');
    return of(role);
  }

  isAdmin(): Observable<boolean> {
    return this.role().pipe(
      switchMap((res: any) => {
        return of(res === 'ADMINISTRATOR');
      })
    );
  }
}
