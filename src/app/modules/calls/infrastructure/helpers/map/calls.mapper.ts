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
      projectManager: {
        responsibleName: param.projectManager.responsibleName,
        emails: param.projectManager.emailOfTheProjectManager,
        phone: param.projectManager.cellPhoneOfTheProjectManager,
      },
      projectDevelopment: {
        whichProblem: param.projectDevelopment.socialProblem,
        generalObjective: param.projectDevelopment.generalObjective,
        numberOfBeneficiaries: param.projectDevelopment.numberOfBeneficiaries,
        collaborationWithOtherOrganizations:
          param.projectDevelopment.receiveCollaboration == null
            ? false
            : param.projectDevelopment.receiveCollaboration,
        collaboratorsAnswer: param.projectDevelopment.which,
        populationsConditionsBefore: param.projectDevelopment.currentPopulation,
        populationsConditionsAfter:
          param.projectDevelopment.conditionsAfterTheIntervention,
        promoteSocialImprovement: param.projectDevelopment.socialBetterment,
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
      projectManager: {
        responsibleName: param.projectManager.responsibleName as string,
        emailOfTheProjectManager: param.projectManager.emails as string,
        cellPhoneOfTheProjectManager: param.projectManager.phone as string,
        comments: param.projectManager.comment as string,
      },
      projectDevelopment: {
        socialProblem: param.projectDevelopment.whichProblem as string,
        generalObjective: param.projectDevelopment.generalObjective as string,
        numberOfBeneficiaries: param.projectDevelopment
          .numberOfBeneficiaries as string,
        receiveCollaboration: param.projectDevelopment
          .collaborationWithOtherOrganizations as boolean,
        which: param.projectDevelopment.collaboratorsAnswer as string,
        currentPopulation: param.projectDevelopment
          .populationsConditionsBefore as string,
        conditionsAfterTheIntervention: param.projectDevelopment
          .populationsConditionsAfter as string,
        socialBetterment: param.projectDevelopment
          .promoteSocialImprovement as string,
        comments: param.projectDevelopment.comment as string,
      },
    };
  }
}
