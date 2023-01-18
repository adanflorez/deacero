import { Observable } from 'rxjs';
import { UserModel } from 'src/app/domain/models/user.model';
import { UserRepository } from 'src/app/domain/repositories/user.repository';
export class GetUserUseCases {
  constructor(private userRepository: UserRepository) {}
  list(): Observable<UserModel[]> {
    return this.userRepository.list();
  }
}
