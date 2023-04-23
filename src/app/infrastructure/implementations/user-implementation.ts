import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/app/domain/models/user.model';
import { UserEntity } from '../driven-adapters/entities/user-entity';
import { UserGateway } from 'src/app/domain';
import { UserImplementationMapper } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class UserImplementation extends UserGateway {
  private apiAdmin = environment.apiAdmin;
  userMapper = new UserImplementationMapper();

  constructor(private http: HttpClient) {
    super();
  }

  list(page: number, perPage: number): Observable<UserModel[]> {
    return this.http
      .get(`${this.apiAdmin}user?page=${page}&size=${perPage}`)
      .pipe(
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
