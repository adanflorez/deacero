import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  sidebarIsOpenSubject = new BehaviorSubject(false);
  constructor() {}

  get sidebarIsOpenValue(): boolean {
    return this.sidebarIsOpenSubject.value;
  }

  set sidebarIsOpenValue(user: boolean) {
    this.sidebarIsOpenSubject.next(user);
  }
}
