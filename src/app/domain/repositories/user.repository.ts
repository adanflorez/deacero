import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
export abstract class UserRepository {
  abstract list(): Observable<UserModel[]>;
}
