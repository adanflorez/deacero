import { Mapper } from 'src/app/base/utils/mapper';

import { CallsForm } from '../../../domain';
import { CallsEntity } from '../../driven-adapters';

export class CallsImplementationMapper extends Mapper<CallsEntity, CallsForm> {
  mapFrom(param: CallsEntity): CallsForm {
    return {
      generalProjectData: {
        category: param.generalProjectData.category
          ? param.generalProjectData.category[0]
          : '',
        comment: param.generalProjectData.comments,
        projectName: param.generalProjectData.projectName,
      },
    };
  }
  override mapTo(param: CallsForm): CallsEntity {
    return {
      generalProjectData: {
        category: [param.generalProjectData.category as string],
        comments: param.generalProjectData.comment as string,
        projectName: param.generalProjectData.projectName as string,
      },
    };
  }
}
