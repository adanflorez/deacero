import { Mapper } from 'src/app/base/utils/mapper';

import { CallsForm } from '../../../domain';
import { CallsEntity } from '../../driven-adapters';
import { OpeningHours } from 'src/app/shared/tables/opening-hours-table';
import ProjectBudget from 'src/app/core/models/project-budget.model';

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
      period: {
        startDate: param.validity.startDate,
        endDate: param.validity.endDate,
        comment: param.validity.comments,
      },
      objectives: {
        objectives: param.objectivesAndGoals.sustainableDevelopmentGoals,
        povertyEnd: param.objectivesAndGoals.endOfPoverty,
        zeroHunger: param.objectivesAndGoals.zeroHunger,
        healthAndWellness: param.objectivesAndGoals.healthAndWellness,
        qualityEducation: param.objectivesAndGoals.qualityEducation,
        genderEquality: param.objectivesAndGoals.genderEquality,
        cleanWater: param.objectivesAndGoals.cleanWaterAndSanitation,
        affordableEnergy: param.objectivesAndGoals.affordableEnergy,
        decentWork: param.objectivesAndGoals.decentWorkAndEconomicGrowth,
        industry: param.objectivesAndGoals.industry,
        reducingInequalities: param.objectivesAndGoals.reductionOfInequality,
        cities: param.objectivesAndGoals.sustainableCitiesandCommunities,
        production:
          param.objectivesAndGoals.responsibleProductionAndConsumption,
        climateAction: param.objectivesAndGoals.climateAction,
        underwaterLife: param.objectivesAndGoals.submarineLife,
        terrestrialEcosystemLife:
          param.objectivesAndGoals.lifeOfTerrestrialEcosystems,
        peace: param.objectivesAndGoals.peaceAndJustice,
        alliances: param.objectivesAndGoals.alliancesToAchieveObjectives,
      },
      projectBudget: {
        comment: param.projectBudget.comments,
        contributions: param.projectBudget.organizationContribution,
        donations: param.projectBudget.donationDeaceroFoundation,
        conversions: param.projectBudget.jointVenture,
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
      validity: {
        comments: param.period.comment as string,
        endDate: param.period.endDate as string,
        startDate: param.period.startDate as string,
      },
      objectivesAndGoals: {
        sustainableDevelopmentGoals: (param.objectives.objectives === ''
          ? null
          : param.objectives.objectives) as string,
        endOfPoverty: param.objectives.povertyEnd as string,
        zeroHunger: param.objectives.zeroHunger as string,
        healthAndWellness: param.objectives.healthAndWellness as string,
        qualityEducation: param.objectives.qualityEducation as string,
        genderEquality: param.objectives.genderEquality as string,
        cleanWaterAndSanitation: param.objectives.cleanWater as string,
        affordableEnergy: param.objectives.affordableEnergy as string,
        decentWorkAndEconomicGrowth: param.objectives.decentWork as string,
        industry: param.objectives.industry as string,
        reductionOfInequality: param.objectives.reducingInequalities as string,
        sustainableCitiesandCommunities: param.objectives.cities as string,
        responsibleProductionAndConsumption: param.objectives
          .production as string,
        climateAction: param.objectives.climateAction as string,
        submarineLife: param.objectives.underwaterLife as string,
        lifeOfTerrestrialEcosystems: param.objectives
          .terrestrialEcosystemLife as string,
        peaceAndJustice: param.objectives.peace as string,
        alliancesToAchieveObjectives: param.objectives.alliances as string,
        comments: param.objectives.comment as string,
      },
      projectBudget: {
        donationDeaceroFoundation: param.projectBudget
          .donations as ProjectBudget[],
        comments: param.projectBudget.comment as string,
        jointVenture: param.projectBudget.conversions as ProjectBudget[],
        organizationContribution: param.projectBudget
          .contributions as ProjectBudget[],
      },
    };
  }
}
