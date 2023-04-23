import { Observable } from 'rxjs';
import { UserModel } from 'src/app/domain/models/user.model';
import { UserGateway } from '../../gateway';
export class GetUserUseCases {
  constructor(private userGateway: UserGateway) {}
  list(page: number, perPage: number): Observable<UserModel[]> {
    return this.userGateway.list(page, perPage);
  }
}
