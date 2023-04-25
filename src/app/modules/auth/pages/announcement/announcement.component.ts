import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  protected announcement: any;
  protected announcementEnable: boolean;
  private readonly authService: AuthService;
  private readonly router: Router;

  constructor(private readonly injector: Injector) {
    this.authService = this.injector.get(AuthService);
    this.router = this.injector.get(Router);
    this.announcementEnable = false;
  }

  public ngOnInit(): void {
    this.availableAnnouncement();
  }

  protected availableAnnouncement(): void {
    this.authService.announcementIsAvailable().subscribe({
      next: response => {
        this.announcement = response.data.announcement;
        this.announcementEnable = response.data.enable;
      },
    });
  }

  protected applyToAnnouncement(): void {
    this.authService.applyToAnnouncement().subscribe({
      next: response => {
        console.log(response);
        this.router.navigate(['/home']);
      },
    });
  }
}
