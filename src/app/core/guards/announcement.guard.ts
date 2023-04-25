import { Injectable, Injector } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementGuard implements CanActivate {
  private authService: AuthService;
  private router: Router;

  constructor(private readonly injector: Injector) {
    this.authService = this.injector.get(AuthService);
    this.router = this.injector.get(Router);
  }
  async canActivate(): Promise<boolean | UrlTree> {
    try {
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
