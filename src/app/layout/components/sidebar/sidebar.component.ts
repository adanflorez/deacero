import { RoleService } from 'src/app/core/services/role.service';
import { Component, OnInit } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { CallService } from 'src/app/core/services/call.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  data$: Observable<boolean>;
  show: boolean;
  showAdministrationOption: boolean;

  constructor(
    layout: LayoutService,
    private callService: CallService,
    private roleService: RoleService
  ) {
    this.show = false;
    this.showAdministrationOption = false;
    this.data$ = layout.sidebarIsOpenSubject;
  }

  ngOnInit(): void {
    this.validateMenu();
    this.data$.subscribe(res => {
      this.show = res;
    });
  }

  async validateMenu(): Promise<void> {
    const res = await firstValueFrom(this.callService.feedbackStatus());
    this.showAdministrationOption = res.data as boolean;
  }

  get isAdmin(): Observable<boolean> {
    return this.roleService.isAdmin();
  }
}
