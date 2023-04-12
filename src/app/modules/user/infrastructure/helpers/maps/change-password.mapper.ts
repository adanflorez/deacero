import { Mapper } from 'src/app/base/utils/mapper';

import { ChangePassword } from '../../../domain';
import { ChangePasswordEntity } from '../../driven-adapters';

export class ChangePasswordImplementationMapper extends Mapper<
  ChangePasswordEntity,
  ChangePassword
> {
  mapFrom(param: ChangePasswordEntity): ChangePassword {
    return {
      id: param.id,
    };
  }
  mapTo(param: ChangePassword): ChangePasswordEntity {
    return {
      id: param.id,
      businessName: param.businessName,
    };
  }
}
