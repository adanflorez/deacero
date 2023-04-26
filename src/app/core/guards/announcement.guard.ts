import { Injectable, Injector } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementGuard implements CanActivate {
  private authService: AuthService;
  private roleService: RoleService;
  private router: Router;

  constructor(private readonly injector: Injector) {
    this.authService = this.injector.get(AuthService);
    this.roleService = this.injector.get(RoleService);
    this.router = this.injector.get(Router);
  }
  async canActivate(): Promise<boolean | UrlTree> {
    try {
      const role = await firstValueFrom(this.roleService.role());
      if (role === 'ADMINISTRATOR') {
        return true;
      }
      const { data } = await firstValueFrom(
        this.authService.announcementIsAvailable()
      );
      if (!data.hasAnActiveCall) {
        this.router.navigate(['/auth/announcement']);
        return false;
      }
      return true;
    } catch (error) {
      return this.router.navigate(['/auth/login']);
    }
  }
}
