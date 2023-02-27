import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import CallForm from 'src/app/core/models/call-form.model';
import FormValid from 'src/app/core/models/form-valid.model';
import { CallService } from 'src/app/core/services/call.service';
import { AlertType } from 'src/app/shared/alert';

@Component({
  selector: 'app-call-alerts',
  templateUrl: './call-alerts.component.html',
  styleUrls: ['./call-alerts.component.scss'],
})
export class CallAlertsComponent implements OnInit {
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formData: CallForm;
  formsStatus: FormValid[];
  showAlert: boolean;
  alertType: AlertType;
  alertMessage: string;
  showModal: boolean;

  constructor(private callService: CallService, private router: Router) {
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
    this.showAlert = false;
    this.alertType = AlertType.Danger;
    this.alertMessage = '';
    this.showModal = false;
  }

  ngOnInit(): void {
    this.loadFeedback();
  }

  updateData = <T>(form: T, isFormValid: FormValid) => {
    const sectionName = isFormValid.name as keyof CallForm;
    const sectionBody = {
      ...this.formData[sectionName],
      ...form,
    } as any;
    this.formData[sectionName] = sectionBody;
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

  async save() {
    const form = {
      generalData: {
        RFC: this.formData.generalData.rfc,
        email: this.formData.generalData.emails,
        razonSocial: this.formData.generalData.businessname,
        position: this.formData.generalData.position,
        nombreComercial: this.formData.generalData.tradename,
        telefono: this.formData.generalData.phone,
        manageTheBankAccount: this.formData.generalData?.accountBankManager,
      },
      procuringFunds: {
        celular: this.formData.fundManager.cellphone,
        emailDelResponsable: this.formData.fundManager.responsibleEmail,
        nombre: this.formData.fundManager.name,
      },
      organizationalInformation: {
        direccionGeneral:
          this.formData.organizationalInformation.generalManagement,
        direccionOperativa:
          this.formData.organizationalInformation.operationalManagement,
        emailDelRepresentanteLegal:
          this.formData.organizationalInformation.legalRepresentativeEmail,
        fechaDeConstitucion:
          this.formData.organizationalInformation.incorporationsStartDate,
        fechaInicioOperaciones:
          this.formData.organizationalInformation.operationsStartDate,
        fundador: this.formData.organizationalInformation.founder,
        mision: this.formData.organizationalInformation.mission,
        representanteLegal:
          this.formData.organizationalInformation.legalRepresentative,
        valores: this.formData.organizationalInformation.ethicalValues,
        vision: this.formData.organizationalInformation.vision,
      },
      sustainabilityAndStrategic: {
        donation: this.formData.strategicAlliances.donations,
        product: this.formData.strategicAlliances.products,
        recibioUnaDonacion: this.formData.strategicAlliances.previousDonations,
        actividadesEspecificasFDA:
          this.formData.strategicAlliances.strategicalAlliances,
        temasAFortalecer: this.formData.strategicAlliances.issuesToStrengthen,
        temasDescripcion: this.formData.strategicAlliances.whichTopics,
        redDeAlianzas: this.formData.strategicAlliances.alliances,
        listaCursosDeActualizacion: this.formData.strategicAlliances.courses,
      },
      hardWork: {
        porqueTrabajarEnTuOSC: this.formData.decentWork.whyYourOSC,
        crecimientoPersonal: this.formData.decentWork.personalGrowth,
        descripcionOSC: this.formData.decentWork.whatMakesYouDifferent,
        diferenciasDeTuOsc: this.formData.decentWork.benefitsSystem,
      },
      governingBody: {
        boardRenewalFrequency: this.formData.governingBody.renewalFrequency,
        membersOfTheGoverning: this.formData.governingBody.members,
        numberOfMeetingsPerYear: this.formData.governingBody.meetings,
      },
      remunerations: {
        workInYourOrganizationIsPaid:
          this.formData.remuneration.remunerationQuestion,
        tableRemunerations: this.formData.remuneration.remunerations,
      },
      generalProjectData: {
        category: [this.formData.generalProjectData.category],
        projectName: this.formData.generalProjectData.projectName,
      },
      location: {
        colony: this.formData.location.colony,
        daysAndHoursOfAttention: this.formData.location.daysAndHours,
        streetAndNumber: this.formData.location.street,
        status: this.formData.location.state,
        municipality: this.formData.location.town,
        postalCode: this.formData.location.postalCode,
        urlProyect: this.formData.location.video,
        howDidYouFindOutAboutTheCall: this.formData.location.aboutCall,
        locationIsVirtual: this.formData.location.locationQuestion,
        whichMeans: this.formData.location.whichMedia,
      },
      projectManager: {
        cellPhoneOfTheProjectManager: this.formData.projectManager.phone,
        emailOfTheProjectManager: this.formData.projectManager.emails,
        responsibleName: this.formData.projectManager.responsibleName,
      },
      projectDevelopment: {
        socialProblem: this.formData.projectDevelopment.whichProblem,
        generalObjective: this.formData.projectDevelopment.generalObjective,
        numberOfBeneficiaries:
          this.formData.projectDevelopment.numberOfBeneficiaries,
        receiveCollaboration:
          this.formData.projectDevelopment.collaborationWithOtherOrganizations,
        which: this.formData.projectDevelopment.collaboratorsAnswer,
        currentPopulation:
          this.formData.projectDevelopment.populationsConditionsBefore,
        conditionsAfterTheIntervention:
          this.formData.projectDevelopment.populationsConditionsAfter,
        socialBetterment:
          this.formData.projectDevelopment.promoteSocialImprovement,
      },
      validity: {
        startDate: this.formData.period.startDate,
        endDate: this.formData.period.endDate,
      },
      objectivesAnfGoals: {
        sustainableDevelopmentGoals: this.formData.objectives.objectives,
        endOfPoverty: this.formData.objectives.povertyEnd,
        zeroHunger: this.formData.objectives.zeroHunger,
        healthAndWellness: this.formData.objectives.healthAndWellness,
        qualityEducation: this.formData.objectives.qualityEducation,
        genderEquality: this.formData.objectives.genderEquality,
        cleanWaterAndSanitation: this.formData.objectives.cleanWater,
        affordableEnergy: this.formData.objectives.affordableEnergy,
        decentWorkAndEconomicGrowth: this.formData.objectives.decentWork,
        industry: this.formData.objectives.industry,
        reductionOfInequality: this.formData.objectives.reducingInequalities,
        sustainableCitiesandCommunities: this.formData.objectives.cities,
        responsibleProductionAndConsumption:
          this.formData.objectives.production,
        climateAction: this.formData.objectives.climateAction,
        submarineLife: this.formData.objectives.underwaterLife,
        lifeOfTerrestrialEcosystems:
          this.formData.objectives.terrestrialEcosystemLife,
        peaceAndJustice: this.formData.objectives.peace,
        alliancesToAchieveObjectives: this.formData.objectives.alliances,
      },
      projectBudget: {
        organizationContribution: this.formData.projectBudget.contributions,
        donationDeaceroFoundation: this.formData.projectBudget.donations,
        jointVenture: this.formData.projectBudget.conversions,
      },
      communication: {
        facebook: this.formData.communication.facebook,
        instagram: this.formData.communication.instagram,
        tiktok: this.formData.communication.tiktok,
        linkedln: this.formData.communication.linkedin,
        twitter: this.formData.communication.twitter,
        youtube: this.formData.communication.youtube,
        webpage: this.formData.communication.webpage
      },
      documents: {
        codeOfEthics: this.formData.documents.ethicalCode,
        governanceHandbook: this.formData.documents.governanceManual,
        scheduleOfActivities: this.formData.documents.timelineActivities,
        workWithMinors: this.formData.documents.workWithMinors,
        officialLetterOfAuthorizationOfDonees:
          this.formData.documents.officialLetterOfAuthorizationOfDonees,
        updatedCertificate: this.formData.documents.updatedCertificate,
        publicationInAnnex14OfTheCurrentRMF:
          this.formData.documents.publicationInAnnex14OfTheCurrentRMF,
        constitutiveActOfTheOrganization:
          this.formData.documents.constituentAct,
        mostRecentMeetingMinutes: this.formData.documents.mostRecentMeeting,
        powerOfLegalRepresentative:
          this.formData.documents.legalRepresentativesPower,
        officialIdentificationOfLegalRepresentative:
          this.formData.documents.legalRepresentativesId,
        documentRFC: this.formData.documents.documentRFC,
        oldProofOfAddress: this.formData.documents.oldProofOfAddress,
        updatedComplianceOpinion:
          this.formData.documents.updatedComplianceOpinion,
        proofOfUpdatedTaxSituation:
          this.formData.documents.proofOfUpdatedTaxSituation,
        logo: this.formData.documents.logo,
      },
      selfAppraisal: {
        improveLivingConditions: this.formData.rating.livingConditions,
        improvementInQualityOfLife: this.formData.rating.lifeQuality,
        selfManagementSkills: this.formData.rating.capacityBuilding,
        supportType: this.formData.rating.supportType,
        scopeOfSupport: this.formData.rating.supportScope,
        resilienceBuilding: this.formData.rating.resilienceBuilding,
        socialLag: this.formData.rating.socialBackwardness,
        developmentOfSenseOfCommunity: this.formData.rating.communitySense,
        sustainabilityProcess: this.formData.rating.sustainabilityProcesses,
        improvementInTheStateOfTheOrganization:
          this.formData.rating.statusImprovement,
        urbanDevelopment: this.formData.rating.urbanDevelopment,
        professionalizationProcess:
          this.formData.rating.professionalizationProcess,
        generationOfOpportunities: this.formData.rating.opportunityGeneration,
      },
    };
    try {
      await firstValueFrom(this.callService.updateFeedback(form));
      await firstValueFrom(this.callService.saveInFlokzu());
      this.showModal = true;
      this.alertMessage = 'Solicitud enviada correctamente';
    } catch (error) {
      console.error(error);
      this.showAlert = true;
      this.alertMessage =
        'No es posible enviar la solicitud en este momento, intentelo mas tarde';
    }
  }

  loadFeedback(): void {
    this.callService.feedback().subscribe((res: any) => {
      this.formData = {
        generalData: {
          comment: res.data.generalData.comments,
          rfc: res.data.generalData.RFC,
          emails: res.data.generalData.email,
          businessname: res.data.generalData.razonSocial,
          position: res.data.generalData.position,
          tradename: res.data.generalData.nombreComercial,
          phone: res.data.generalData.telefono,
          accountBankManager: res.data.generalData.manageTheBankAccount,
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
          comment: res.data.objectivesAndGoals.comments,
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
          webpage: res.data.communication.webpage
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
          updatedComplianceOpinion: res.data.documents.updatedComplianceOpinion,
          updatedComplianceOpinionComment:
            res.data.documents.commentsInUpdatedComplianceOpinion,
          proofOfUpdatedTaxSituation:
            res.data.documents.proofOfUpdatedTaxSituation,
          proofOfUpdatedTaxSituationComment:
            res.data.documents.commentsInProofOfUpdatedFiscalSituation,
          logo: res.data.documents.logo,
          logoComment: res.data.documents.logoComments,
        },
        rating: {
          livingConditions: res.data.selfAppraisal.improveLivingConditions,
          lifeQuality: res.data.selfAppraisal.improvementInQualityOfLife,
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

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/home']).finally(() => window.location.reload());
  }
}
