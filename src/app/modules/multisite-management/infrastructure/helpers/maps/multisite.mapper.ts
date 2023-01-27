import { Mapper } from 'src/app/base/utils/mapper';

import { Multisite } from '../../../domain';
import { MultisiteEntity } from '../../driven-adapters';

export class MultisiteImplementationMapper extends Mapper<
  MultisiteEntity,
  Multisite
> {
  mapFrom(param: MultisiteEntity): Multisite {
    return {
      id: param.id,
      businessName: param.businessName,
      rfc: param.rfc,
      siteName: param.venueName,
      user: param.email,
    };
  }
  mapTo(param: Multisite): MultisiteEntity {
    return {
      id: param.id as string,
      businessName: param.businessName as string,
      rfc: param.rfc as string,
      venueName: param.siteName as string,
      email: param.user as string,
    };
  }
}
