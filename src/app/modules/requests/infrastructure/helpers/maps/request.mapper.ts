import { Mapper } from 'src/app/base/utils/mapper';

import { Request } from '../../../domain';
import { RequestEntity } from '../../driven-adapters';

export class RequestImplementationMapper extends Mapper<
  RequestEntity,
  Request
> {
  override mapFrom(param: RequestEntity): Request {
    return {
      id: param.requestId,
      callId: param.callId,
      businessName: param.businessName,
      rfc: param.rfc,
      status: param.status,
      applicationId: param.applicationId,
    };
  }
  override mapTo(param: Request): RequestEntity {
    throw new Error('Method not implemented.');
  }
}
