import { Mapper } from 'src/app/base/utils/mapper';

import { CallsEntity } from '../../driven-adapters';
import { OpeningHours } from 'src/app/shared/tables/opening-hours-table';
import ProjectBudget from 'src/app/core/models/project-budget.model';
import { CallsForm } from 'src/app/domain';

export class CallsImplementationMapper extends Mapper<CallsEntity, CallsForm> {
  mapFrom(param: CallsEntity): CallsForm {
    return {
      generalProjectData: {
        category: param.generalProjectData.category
          ? param.generalProjectData.category[0]
          : '',
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
        contributions: param.projectBudget.organizationContribution,
        donations: param.projectBudget.donationDeaceroFoundation,
        conversions: param.projectBudget.jointVenture,
      },
      rating: {
        capacityBuilding: param.selfAppraisal.selfManagementSkills,
        supportType: param.selfAppraisal.supportType,
        supportScope: param.selfAppraisal.scopeOfSupport,
        resilienceBuilding: param.selfAppraisal.resilienceBuilding,
        socialBackwardness: param.selfAppraisal.socialLag,
        communitySense: param.selfAppraisal.developmentOfSenseOfCommunity,
        sustainabilityProcesses: param.selfAppraisal.sustainabilityProcess,
        statusImprovement:
          param.selfAppraisal.improvementInTheStateOfTheOrganization,
        urbanDevelopment: param.selfAppraisal.urbanDevelopment,
        professionalizationProcess:
          param.selfAppraisal.professionalizationProcess,
        opportunityGeneration: param.selfAppraisal.generationOfOpportunities,
      },
      communication: {
        facebook: param.communication.facebook,
        instagram: param.communication.instagram,
        linkedin: param.communication.linkedln,
        twitter: param.communication.twitter,
        tiktok: param.communication.tiktok,
        youtube: param.communication.youtube,
        webpage: param.communication.webpage,
      },
      documents: {
        ethicalCode: param.documents.codeOfEthics,
        governanceManual: param.documents.governanceHandbook,
        timelineActivities: param.documents.scheduleOfActivities,
        workWithMinors: param.documents.workWithMinors,
        officialLetterOfAuthorizationOfDonees:
          param.documents.officialLetterOfAuthorizationOfDonees,
        // updatedCertificate: param.documents.updatedCertificate,
        publicationInAnnex14OfTheCurrentRMF:
          param.documents.publicationInAnnex14OfTheCurrentRMF,
        constituentAct: param.documents.constitutiveActOfTheOrganization,
        mostRecentMeeting: param.documents.mostRecentMeetingMinutes,
        legalRepresentativesPower: param.documents.powerOfLegalRepresentative,
        legalRepresentativesId:
          param.documents.officialIdentificationOfLegalRepresentative,
        // documentRFC: param.documents.documentRFC,
        oldProofOfAddress: param.documents.oldProofOfAddress,
        updatedComplianceOpinion: param.documents.updatedComplianceOpinion,
        proofOfUpdatedTaxSituation: param.documents.proofOfUpdatedTaxSituation,
        logo: param.documents.logo,
      },
      status: param.portalStatusCode as number,
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
        howDidYouFindOutAboutTheCall: [param.location.aboutCall] as string[],
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
      selfAppraisal: {
        improveLivingConditions: param.rating.livingConditions as string,
        improvementInQualityOfLife: param.rating.lifeQuality as string,
        selfManagementSkills: param.rating.capacityBuilding as string,
        supportType: param.rating.supportType as string,
        scopeOfSupport: param.rating.supportScope as string,
        resilienceBuilding: param.rating.resilienceBuilding as string,
        socialLag: param.rating.socialBackwardness as string,
        developmentOfCapacitiesForSelfManagement: param.rating
          .capacityBuilding as string,
        developmentOfSenseOfCommunity: param.rating.communitySense as string,
        sustainabilityProcess: param.rating.sustainabilityProcesses as string,
        improvementInTheStateOfTheOrganization: param.rating
          .statusImprovement as string,
        urbanDevelopment: param.rating.urbanDevelopment as string,
        professionalizationProcess: param.rating
          .professionalizationProcess as string,
        generationOfOpportunities: param.rating.opportunityGeneration as string,
        comments: param.rating.comment as string,
      },
      communication: {
        facebook: param.communication.facebook as string,
        instagram: param.communication.instagram as string,
        linkedln: param.communication.linkedin as string,
        twitter: param.communication.twitter as string,
        tiktok: param.communication.tiktok as string,
        youtube: param.communication.youtube as string,
        webpage: param.communication.webpage as string,
        comments: param.communication.comment as string,
      },
      documents: {
        codeOfEthics: param.documents.ethicalCode as string,
        governanceHandbook: param.documents.governanceManual as string,
        scheduleOfActivities: param.documents.timelineActivities as string,
        workWithMinors: param.documents.workWithMinors as string,
        officialLetterOfAuthorizationOfDonees: param.documents
          .officialLetterOfAuthorizationOfDonees as string,
        // updatedCertificate: updatedCertificate,
        publicationInAnnex14OfTheCurrentRMF: param.documents
          .publicationInAnnex14OfTheCurrentRMF as string,
        constitutiveActOfTheOrganization: param.documents
          .constituentAct as string,
        mostRecentMeetingMinutes: param.documents.mostRecentMeeting as string,
        powerOfLegalRepresentative: param.documents
          .legalRepresentativesPower as string,
        officialIdentificationOfLegalRepresentative: param.documents
          .legalRepresentativesId as string,
        // documentRFC: documentRFC,
        oldProofOfAddress: param.documents.oldProofOfAddress as string,
        updatedComplianceOpinion: param.documents
          .updatedComplianceOpinion as string,
        proofOfUpdatedTaxSituation: param.documents
          .proofOfUpdatedTaxSituation as string,
        logo: param.documents.logo as string,
      },
    };
  }
}
