import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { RoleService } from 'src/app/core/services/role.service';
import { CallsUseCase } from 'src/app/domain';

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
    private callsService: CallsUseCase,
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
    const res = await firstValueFrom(this.callsService.feedbackStatus());
    this.showAdministrationOption = res.data as boolean;
  }

  get isAdmin(): Observable<boolean> {
    return this.roleService.isAdmin();
  }
}
