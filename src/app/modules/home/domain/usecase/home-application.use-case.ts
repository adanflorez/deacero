import { Observable } from 'rxjs';
import { HomeApplicationGateway } from '../gateway';
import { HomeForm } from '../models';

export class HomeApplicationUseCase {
  constructor(private homeApplicationGateway: HomeApplicationGateway) {}

  get(): Observable<HomeForm> {
    return this.homeApplicationGateway.get();
  }
}
