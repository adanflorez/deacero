import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import CallForm from 'src/app/lib/models/call-form.model';
import FormValid from 'src/app/lib/models/form-valid.model';
import { CallService } from 'src/app/lib/services/call.service';

@Component({
  selector: 'app-call-alerts',
  templateUrl: './call-alerts.component.html',
  styleUrls: ['./call-alerts.component.scss'],
})
export class CallAlertsComponent implements OnInit {
  formData: CallForm;
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formsStatus: FormValid[];

  constructor(private callService: CallService) {
    this.formsStatus = [];
    this.formData = {
      generalData: {},
      fundManager: {},
      organizationalInformation: {},
      strategicAlliances: {},
      decentWork: {},
      governingBody: {},
      remuneration: {},
      generalProjectData: {},
      location: {},
      projectManager: {},
      projectDevelopment: {},
      period: {},
      objectives: {},
      projectBudget: {},
      communication: {},
      documents: {},
      rating: {},
    };
  }

  ngOnInit(): void {
    this.loadFeedback();
  }

  updateData = <T>(form: T, isFormValid: FormValid) => {
    const currentData = this.formData;
    const updatedData = { ...currentData, ...form };
    this.formData = updatedData;
    console.log(isFormValid);
    this.updateFormStatus(isFormValid);
  };

  private updateFormStatus(formValid: FormValid): void {
    const index = this.formsStatus.findIndex(
      item => item.name === formValid.name
    );
    if (index === -1) {
      this.formsStatus.push(formValid);
    } else {
      this.formsStatus.splice(index, 1);
      this.formsStatus.push(formValid);
    }
  }

  get isInvalidForm(): boolean {
    return this.formsStatus.length > 0
      ? this.formsStatus.some(form => !form.valid)
      : true;
  }

  get emptyDocuments(): boolean {
    return JSON.stringify(this.formData.documents) === '{}';
  }

  save() {
    console.log('sending...');
  }

  loadFeedback(): void {
    this.callService.feedback().subscribe((res: any) => {
      console.log(res.data);
      this.formData = {
        generalData: {
          comment: res.data.generalData.comments,
          rfc: res.data.generalData.RFC,
          emails: res.data.generalData.email,
          businessname: res.data.generalData.razonSocial,
          position: res.data.generalData.position,
          tradename: res.data.generalData.nombreComercial,
          phone: res.data.generalData.telefono,
        },
        fundManager: {
          cellphone: res.data.procuringFunds.celular,
          comment: res.data.procuringFunds.comments,
          responsibleEmail: res.data.procuringFunds.emailDelResponsable,
          name: res.data.procuringFunds.nombre,
        },
        organizationalInformation: {
          comment: res.data.organizationalInformation.comments,
          generalManagement:
            res.data.organizationalInformation.direccionGeneral,
          operationalManagement:
            res.data.organizationalInformation.direccionOperativa,
          legalRepresentativeEmail:
            res.data.organizationalInformation.emailDelRepresentanteLegal,
          incorporationsStartDate:
            res.data.organizationalInformation.fechaDeConstitucion,
          operationsStartDate:
            res.data.organizationalInformation.fechaInicioOperaciones,
          founder: res.data.organizationalInformation.fundador,
          mission: res.data.organizationalInformation.mision,
          legalRepresentative:
            res.data.organizationalInformation.representanteLegal,
          ethicalValues: res.data.organizationalInformation.valores,
          vision: res.data.organizationalInformation.vision,
        },
        strategicAlliances: {
          comment: res.data.sustainabilityAndStrategic.comments,
          donations: res.data.sustainabilityAndStrategic.donation,
          products: res.data.sustainabilityAndStrategic.product,
          previousDonations:
            res.data.sustainabilityAndStrategic.recibioUnaDonacion,
          strategicalAlliances:
            res.data.sustainabilityAndStrategic.actividadesEspecificasFDA,
          issuesToStrengthen:
            res.data.sustainabilityAndStrategic.temasAFortalecer,
          whichTopics: res.data.sustainabilityAndStrategic.temasDescripcion,
          alliances: res.data.sustainabilityAndStrategic.redDeAlianzas,
          courses:
            res.data.sustainabilityAndStrategic.listaCursosDeActualizacion,
        },
        decentWork: {
          comment: res.data.hardWork.comments,
          whyYourOSC: res.data.hardWork.porqueTrabajarEnTuOSC,
          personalGrowth: res.data.hardWork.crecimientoPersonal,
          whatMakesYouDifferent: res.data.hardWork.descripcionOSC,
          benefitsSystem: res.data.hardWork.diferenciasDeTuOsc,
        },
        governingBody: {
          comment: res.data.governingBody.comments,
          renewalFrequency: res.data.governingBody.boardRenewalFrequency,
          members: res.data.governingBody.membersOfTheGoverning,
          meetings: res.data.governingBody.numberOfMeetingsPerYear,
        },
        remuneration: {
          comment: res.data.remunerations.comments,
          remunerationQuestion:
            res.data.remunerations.workInYourOrganizationIsPaid,
          remunerations: res.data.remunerations.tableRemunerations,
        },
        generalProjectData: {
          comment: res.data.generalProjectData.comments,
          category: res.data.generalProjectData.category[0],
          projectName: res.data.generalProjectData.projectName,
        },
        location: {
          colony: res.data.location.colony,
          comment: res.data.location.comments,
          daysAndHours: res.data.location.daysAndHoursOfAttention,
          street: res.data.location.streetAndNumber,
          state: res.data.location.status,
          town: res.data.location.municipality,
          postalCode: res.data.location.postalCode,
          video: res.data.location.urlProyect,
          aboutCall: res.data.location.howDidYouFindOutAboutTheCall,
          locationQuestion: res.data.location.locationIsVirtual,
          whichMedia: res.data.location.whichMeans,
        },
        projectManager: {
          phone: res.data.projectManager.cellPhoneOfTheProjectManager,
          comment: res.data.projectManager.comments,
          emails: res.data.projectManager.emailOfTheProjectManager,
          responsibleName: res.data.projectManager.responsibleName,
        },
        projectDevelopment: {
          comment: res.data.projectDevelopment.comments,
          whichProblem: res.data.projectDevelopment.socialProblem,
          generalObjective: res.data.projectDevelopment.generalObjective,
          numberOfBeneficiaries:
            res.data.projectDevelopment.numberOfBeneficiaries,
          collaborationWithOtherOrganizations:
            res.data.projectDevelopment.receiveCollaboration == null
              ? false
              : res.data.projectDevelopment.receiveCollaboration,
          collaboratorsAnswer: res.data.projectDevelopment.which,
          populationsConditionsBefore:
            res.data.projectDevelopment.currentPopulation,
          populationsConditionsAfter:
            res.data.projectDevelopment.conditionsAfterTheIntervention,
          promoteSocialImprovement:
            res.data.projectDevelopment.socialBetterment,
        },
        period: {
          comment: res.data.validity.comments,
          startDate: res.data.validity.startDate,
          endDate: res.data.validity.endDate,
        },
        objectives: {
          objectives: res.data.objectivesAndGoals.sustainableDevelopmentGoals,
          povertyEnd: res.data.objectivesAndGoals.endOfPoverty,
          zeroHunger: res.data.objectivesAndGoals.zeroHunger,
          healthAndWellness: res.data.objectivesAndGoals.healthAndWellness,
          qualityEducation: res.data.objectivesAndGoals.qualityEducation,
          genderEquality: res.data.objectivesAndGoals.genderEquality,
          cleanWater: res.data.objectivesAndGoals.cleanWaterAndSanitation,
          affordableEnergy: res.data.objectivesAndGoals.affordableEnergy,
          decentWork: res.data.objectivesAndGoals.decentWorkAndEconomicGrowth,
          industry: res.data.objectivesAndGoals.industry,
          reducingInequalities:
            res.data.objectivesAndGoals.reductionOfInequality,
          cities: res.data.objectivesAndGoals.sustainableCitiesandCommunities,
          production:
            res.data.objectivesAndGoals.responsibleProductionAndConsumption,
          climateAction: res.data.objectivesAndGoals.climateAction,
          underwaterLife: res.data.objectivesAndGoals.submarineLife,
          terrestrialEcosystemLife:
            res.data.objectivesAndGoals.lifeOfTerrestrialEcosystems,
          peace: res.data.objectivesAndGoals.peaceAndJustice,
          alliances: res.data.objectivesAndGoals.alliancesToAchieveObjectives,
        },
        projectBudget: {
          comment: res.data.projectBudget.comments,
          contributions: res.data.projectBudget.organizationContribution,
          donations: res.data.projectBudget.donationDeaceroFoundation,
          conversions: res.data.projectBudget.jointVenture,
        },
        communication: {
          comment: res.data.communication.comments,
          facebook: res.data.communication.facebook,
          instagram: res.data.communication.instagram,
          tiktok: res.data.communication.tiktok,
          linkedin: res.data.communication.linkedln,
          twitter: res.data.communication.twitter,
          youtube: res.data.communication.youtube,
        },
        documents: {
          ethicalCode: res.data.documents.codeOfEthics,
          ethicalCodeComment: res.data.documents.commentsCodeOfEthics,
          governanceManual: res.data.documents.governanceHandbook,
          governanceManualComment:
            res.data.documents.commentsInTheGovernanceManual,
          timelineActivities: res.data.documents.scheduleOfActivities,
          timelineActivitiesComment:
            res.data.documents.commentsInTheScheduleOfActivities,
          workWithMinors: res.data.documents.workWithMinors,
          workWithMinorsComment:
            res.data.documents.commentsOnPoliciesToEnsureTheWelfareOfMinors,
          officialLetterOfAuthorizationOfDonees:
            res.data.documents.officialLetterOfAuthorizationOfDonees,
          officialLetterOfAuthorizationOfDoneesComment:
            res.data.documents.commentsInSATDoneAuthorizationLetter,
          updatedCertificate: res.data.documents.updatedCertificate,
          updatedCertificateComment:
            res.data.documents
              .commentsInAnUpdatedRecordOfTheFederalTaxpayerRegistry,
          publicationInAnnex14OfTheCurrentRMF:
            res.data.documents.publicationInAnnex14OfTheCurrentRMF,
          publicationInAnnex14OfTheCurrentRMFComment:
            res.data.documents.commentsInPublicationInAnnexOfTheCurrentRMF,
          constituentAct: res.data.documents.constitutiveActOfTheOrganization,
          constituentActComment:
            res.data.documents.commentsToTheConstitutiveActOfOrganization,
          mostRecentMeeting: res.data.documents.mostRecentMeetingMinutes,
          mostRecentMeetingComment:
            res.data.documents.commentsInTheMostRecentMeetingMinutes,
          legalRepresentativesPower:
            res.data.documents.powerOfLegalRepresentative,
          legalRepresentativesPowerComment:
            res.data.documents.commentsInPowerOfLegalRepresentatives,
          legalRepresentativesId:
            res.data.documents.officialIdentificationOfLegalRepresentative,
          legalRepresentativesIdComment:
            res.data.documents
              .commentsInOfficialIdentificationOfTheLegalRepresentative,
          documentRFC: res.data.documents.documentRFC,
          documentRFCComment: res.data.documents.commentsInTheRFCDocument,
          oldProofOfAddress: res.data.documents.oldProofOfAddress,
          oldProofOfAddressComment:
            res.data.documents
              .commentsProofOfAddressWithAnAgeOfNoMoreThanMonths,
        },
        rating: {
          comment: res.data.selfAppraisal.comments,
          capacityBuilding: res.data.selfAppraisal.selfManagementSkills,
          supportType: res.data.selfAppraisal.supportType,
          supportScope: res.data.selfAppraisal.scopeOfSupport,
          resilienceBuilding: res.data.selfAppraisal.resilienceBuilding,
          socialBackwardness: res.data.selfAppraisal.socialLag,
          communitySense: res.data.selfAppraisal.developmentOfSenseOfCommunity,
          sustainabilityProcesses: res.data.selfAppraisal.sustainabilityProcess,
          statusImprovement:
            res.data.selfAppraisal.improvementInTheStateOfTheOrganization,
          urbanDevelopment: res.data.selfAppraisal.urbanDevelopment,
          professionalizationProcess:
            res.data.selfAppraisal.professionalizationProcess,
          opportunityGeneration:
            res.data.selfAppraisal.generationOfOpportunities,
        },
      };
    });
  }
}
