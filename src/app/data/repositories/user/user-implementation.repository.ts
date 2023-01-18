import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRepository } from 'src/app/domain/repositories/user.repository';
import { UserModel } from 'src/app/domain/models/user.model';
import { UserEntity } from './entities/user-entity';
import { UserImplementationRepositoryMapper } from './mappers/user-repository.mapper';

@Injectable({
  providedIn: 'root',
})
export class UserImplementationRepository extends UserRepository {
  private apiAdmin = environment.apiAdmin;
  userMapper = new UserImplementationRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  list(): Observable<UserModel[]> {
    return this.http.get(`${this.apiAdmin}user`).pipe(
      map((response: any) => {
        const users: Array<UserEntity> = response.data.users;
        const userMapped: UserModel[] = users.map(user =>
          this.userMapper.mapFrom(user)
        );
        return userMapped;
      })
    );
  }
}
