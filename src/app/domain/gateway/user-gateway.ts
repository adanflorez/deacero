import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
export abstract class UserGateway {
  abstract list(
    page: number,
    perPage: number
  ): Observable<{ users: UserModel[]; size: number }>;
}
