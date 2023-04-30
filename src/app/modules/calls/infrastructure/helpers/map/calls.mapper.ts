import { Mapper } from 'src/app/base/utils/mapper';

import { CallsForm } from '../../../domain';
import { CallsEntity } from '../../driven-adapters';
import { OpeningHours } from 'src/app/shared/tables/opening-hours-table';

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
      location: {
        locationQuestion: param.location.locationIsVirtual,
        street: param.location.streetAndNumber,
        colony: param.location.colony,
        town: param.location.municipality,
        state: param.location.status,
        postalCode: param.location.postalCode,
        video: param.location.urlProyect,
        aboutCall: param.location.howDidYouFindOutAboutTheCall
          ? param.location.howDidYouFindOutAboutTheCall[0]
          : '',
        whichMedia: param.location.whichMeans,
        daysAndHours: param.location.daysAndHoursOfAttention,
      },
    };
  }

  mapTo(param: CallsForm): CallsEntity {
    return {
      generalProjectData: {
        category: [param.generalProjectData.category as string],
        comments: param.generalProjectData.comment as string,
        projectName: param.generalProjectData.projectName as string,
      },
      location: {
        locationIsVirtual: param.location.locationQuestion as boolean,
        streetAndNumber: param.location.street as string,
        colony: param.location.colony as string,
        municipality: param.location.town as string,
        status: param.location.state as string,
        postalCode: param.location.postalCode as string,
        urlProyect: param.location.video as string,
        daysAndHoursOfAttention: param.location.daysAndHours as OpeningHours[],
        howDidYouFindOutAboutTheCall: param.location.aboutCall as string,
        whichMeans: param.location.whichMedia as string,
        comments: param.location.comment as string,
      },
    };
  }
}
