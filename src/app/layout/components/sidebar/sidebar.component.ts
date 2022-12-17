import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/lib/services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  data$: Observable<boolean>;
  show: boolean;
  constructor(private layout: LayoutService) {
    this.data$ = layout.sidebarIsOpenSubject;
  }

  ngOnInit(): void {
    this.data$.subscribe(res => {
      this.show = res;
    });
  }
}
