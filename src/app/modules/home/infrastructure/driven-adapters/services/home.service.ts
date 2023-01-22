import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeApplicationUseCase, HomeForm } from './../../../domain';

@Injectable()
export class HomeService {
  constructor(private homeApplicationUseCase: HomeApplicationUseCase) {}

  get(): Observable<HomeForm> {
    return this.homeApplicationUseCase.get();
  }
}
