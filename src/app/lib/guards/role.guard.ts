import { RoleService } from './../services/role.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private roleService: RoleService) {}
  canActivate(
    next: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkUserLogin(next);
  }

  checkUserLogin(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.roleService.role().pipe(
      switchMap((role: any) => {
        const roleExists = route.data.role === role;
        if (roleExists) {
          return of(roleExists);
        }
        return this.router.navigateByUrl('/auth');
      })
    );
  }
}
