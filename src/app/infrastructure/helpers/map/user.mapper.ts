import { UserModel } from 'src/app/domain/models/user.model';
import { Mapper } from 'src/app/base/utils/mapper';
import { UserEntity } from '../../driven-adapters';
export class UserImplementationMapper extends Mapper<UserEntity, UserModel> {
  mapFrom(param: UserEntity): UserModel {
    return {
      id: param.id,
      email: param.email,
      rfc: param.businessName,
      role: param.rol,
      status: param.status,
      name: param.firstName,
      lastname: param.lastName,
    };
  }
  mapTo(param: UserModel): UserEntity {
    return {
      id: param.id as string,
      firstName: param.name,
      lastName: param.lastname,
      email: param.email,
      businessName: param.rfc,
      rol: param.role,
      status: param.status,
    };
  }
}
