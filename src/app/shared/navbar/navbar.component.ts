import { Observable } from 'rxjs';
import { LayoutService } from '../../core/services/layout.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  data$: Observable<boolean>;
  constructor(private layout: LayoutService) {
    this.data$ = layout.sidebarIsOpenSubject;
  }

  showSidebar() {
    this.layout.sidebarIsOpenSubject.next(!this.layout.sidebarIsOpenValue);
  }
}
