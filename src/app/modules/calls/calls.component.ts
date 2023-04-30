import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, catchError, Subscription, throwError } from 'rxjs';
import { OBJECTIVES, RATING } from 'src/app/core/constants';
import FormValid from 'src/app/core/models/form-valid.model';
import ProjectBudget from 'src/app/core/models/project-budget.model';
import { CallService } from 'src/app/core/services/call.service';
import { UserService } from 'src/app/core/services/user.service';
import { OpeningHours } from 'src/app/shared/tables/opening-hours-table';

import { CallsForm, CallsUseCase } from './domain';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  form!: FormGroup;
  groups: string[] = [];
  categories = [
    // 'Alimentación',
    // 'Asistencia jurídica',
    // 'Asistencia o rehabilitación médica',
    // 'Atención a grupos sociales con discapacidad',
    'Becas',
    // 'Defensa y promoción de los DH',
    // 'Desarrollo comunidades indígenas.',
    // 'Desarrollo Institucional',
    // 'Desarrollo urbano',
    // 'Detonación de oportunidades para la resiliencia económica.',
    // 'Ecología',
    'Educación',
    // 'Empoderamiento social',
    // 'Equipamiento',
    // 'Fomento educativo',
    // 'Inclusión',
    // 'Infraestructura',
    // 'Medio ambiente',
    // 'Nutrición',
    // 'Orientación social',
    // 'Participación ciudadana.',
    // 'Promoción y difusión cultural',
    // 'Reinserción social',
    // 'Salud mental',
    'Primera infancia', //24
    'Ciencia y tecnología calidad de vida', //25
    'Emprendimiento', //26
  ];
  rating = RATING;
  locationFields = ['street', 'colony', 'town', 'state', 'postalCode'];
  objectivesOptions = OBJECTIVES;
  objectivesFields = [
    'povertyEnd',
    'zeroHunger',
    'healthAndWellness',
    'qualityEducation',
    'genderEquality',
    'cleanWater',
    'affordableEnergy',
    'decentWork',
    'industry',
    'reducingInequalities',
    'cities',
    'production',
    'climateAction',
    'underwaterLife',
    'terrestrialEcosystemLife',
    'peace',
    'alliances',
  ];
  documentsFields!: Array<{ field: string; name: string; help: string }>;
  contributions: ProjectBudget[] = [];
  conversions: ProjectBudget[] = [];
  donations: ProjectBudget[] = [];
  openingHours: Array<OpeningHours> = [];
  tempDocumentUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  closeResult: string;
  hideForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call: any = undefined;
  infoSubmitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Refactor
  public formData: CallsForm;
  public formsStatus: FormValid[];
  public loading: boolean;

  constructor(
    private modalService: NgbModal,
    private callService: CallService,
    private userService: UserService,
    // Refactor
    private readonly callsService: CallsUseCase
  ) {
    this.closeResult = '';
    // Refactor
    this.formsStatus = [];
    this.formData = {
      generalProjectData: {},
      location: {},
      projectManager: {},
    };
    this.loading = false;
  }

  ngOnInit(): void {
    this.userService.OSCstatus().subscribe({
      next: res => {
        if (res.data) {
          this.getApplication();
        } else {
          this.hideForm$.next(true);
        }
      },
      error: error => console.error(error),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseResponse(res: any) {
    this.contributions = res?.projectBudget.organizationContribution || [];
    this.conversions = res?.projectBudget.jointVenture || [];
    this.donations = res?.projectBudget.donationDeaceroFoundation || [];
    this.openingHours = res?.location.daysAndHoursOfAttention || [];
    this.call = {
      // General project data
      projectName: res?.generalProjectData.projectName,
      category: res?.generalProjectData.category
        ? res?.generalProjectData.category[0]
        : '',
      // Location
      locationQuestion: res?.location.locationIsVirtual,
      street: res?.location.streetAndNumber,
      colony: res?.location.colony,
      town: res?.location.municipality,
      state: res?.location.status,
      postalCode: res?.location.postalCode,
      video: res?.location.urlProyect,
      aboutCall: res?.location.howDidYouFindOutAboutTheCall
        ? res?.location.howDidYouFindOutAboutTheCall[0]
        : '',
      whichMedia: res?.location.whichMeans,
      // Responsible
      responsibleName: res?.projectManager.responsibleName,
      emails: res?.projectManager.emailOfTheProjectManager,
      phone: res?.projectManager.cellPhoneOfTheProjectManager,
      // Development
      whichProblem: res?.projectDevelopment.socialProblem,
      generalObjective: res?.projectDevelopment.generalObjective,
      numberOfBeneficiaries: res?.projectDevelopment.numberOfBeneficiaries,
      collaborationWithOtherOrganizations:
        res?.projectDevelopment.receiveCollaboration == null
          ? false
          : res?.projectDevelopment.receiveCollaboration,
      collaboratorsAnswer: res?.projectDevelopment.which,
      populationsConditionsBefore: res?.projectDevelopment.currentPopulation,
      populationsConditionsAfter:
        res?.projectDevelopment.conditionsAfterTheIntervention,
      promoteSocialImprovement: res?.projectDevelopment.socialBetterment,
      // Validity
      startDate: res?.validity.startDate,
      endDate: res?.validity.endDate,
      // Objectives
      objectives: res?.objectivesAndGoals.sustainableDevelopmentGoals,
      povertyEnd: res?.objectivesAndGoals.endOfPoverty,
      zeroHunger: res?.objectivesAndGoals.zeroHunger,
      healthAndWellness: res?.objectivesAndGoals.healthAndWellness,
      qualityEducation: res?.objectivesAndGoals.qualityEducation,
      genderEquality: res?.objectivesAndGoals.genderEquality,
      cleanWater: res?.objectivesAndGoals.cleanWaterAndSanitation,
      affordableEnergy: res?.objectivesAndGoals.affordableEnergy,
      decentWork: res?.objectivesAndGoals.decentWorkAndEconomicGrowth,
      industry: res?.objectivesAndGoals.industry,
      reducingInequalities: res?.objectivesAndGoals.reductionOfInequality,
      cities: res?.objectivesAndGoals.sustainableCitiesandCommunities,
      production: res?.objectivesAndGoals.responsibleProductionAndConsumption,
      climateAction: res?.objectivesAndGoals.climateAction,
      underwaterLife: res?.objectivesAndGoals.submarineLife,
      terrestrialEcosystemLife:
        res?.objectivesAndGoals.lifeOfTerrestrialEcosystems,
      peace: res?.objectivesAndGoals.peaceAndJustice,
      alliances: res?.objectivesAndGoals.alliancesToAchieveObjectives,
      // Communication
      facebook: res?.communication.facebook,
      instagram: res?.communication.instagram,
      linkedin: res?.communication.linkedln,
      twitter: res?.communication.twitter,
      tiktok: res?.communication.tiktok,
      youtube: res?.communication.youtube,
      webpage: res?.communication.webpage,

      // Documents
      ethicalCode: res?.documents.codeOfEthics,
      governanceManual: res?.documents.governanceHandbook,
      timelineActivities: res?.documents.scheduleOfActivities,
      workWithMinors: res?.documents.workWithMinors,
      officialLetterOfAuthorizationOfDonees:
        res?.documents.officialLetterOfAuthorizationOfDonees,
      // updatedCertificate: res?.documents.updatedCertificate,
      publicationInAnnex14OfTheCurrentRMF:
        res?.documents.publicationInAnnex14OfTheCurrentRMF,
      constituentAct: res?.documents.constitutiveActOfTheOrganization,
      mostRecentMeeting: res?.documents.mostRecentMeetingMinutes,
      legalRepresentativesPower: res?.documents.powerOfLegalRepresentative,
      legalRepresentativesId:
        res?.documents.officialIdentificationOfLegalRepresentative,
      // documentRFC: res?.documents.documentRFC,
      oldProofOfAddress: res?.documents.oldProofOfAddress,
      updatedComplianceOpinion: res?.documents.updatedComplianceOpinion,
      proofOfUpdatedTaxSituation: res?.documents.proofOfUpdatedTaxSituation,
      subscribe: res?.documents.doYouWanToSubscribe,
      logo: res?.documents.logo,
      livingConditions: res?.selfAppraisal.improveLivingConditions,
      lifeQuality: res?.selfAppraisal.improvementInQualityOfLife,
      // Rating
      capacityBuilding: res?.selfAppraisal.selfManagementSkills,
      supportType: res?.selfAppraisal.supportType,
      supportScope: res?.selfAppraisal.scopeOfSupport,
      resilienceBuilding: res?.selfAppraisal.resilienceBuilding,
      socialBackwardness: res?.selfAppraisal.socialLag,
      communitySense: res?.selfAppraisal.developmentOfSenseOfCommunity,
      sustainabilityProcesses: res?.selfAppraisal.sustainabilityProcess,
      statusImprovement:
        res?.selfAppraisal.improvementInTheStateOfTheOrganization,
      urbanDevelopment: res?.selfAppraisal.urbanDevelopment,
      professionalizationProcess: res?.selfAppraisal.professionalizationProcess,
      opportunityGeneration: res?.selfAppraisal.generationOfOpportunities,
    };
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  open(content: unknown): void {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        () => {
          this.form.reset();
        }
      );
  }

  save(modal?: unknown, updateAndSave?: boolean) {
    const {
      projectName,
      category,
      locationQuestion,
      street,
      colony,
      town,
      state,
      postalCode,
      video,
      aboutCall,
      whichMedia,
      responsibleName,
      emails,
      phone,
      whichProblem,
      generalObjective,
      numberOfBeneficiaries,
      collaborationWithOtherOrganizations,
      collaboratorsAnswer,
      populationsConditionsBefore,
      populationsConditionsAfter,
      promoteSocialImprovement,
      startDate,
      endDate,
      objectives,
      povertyEnd,
      zeroHunger,
      healthAndWellness,
      qualityEducation,
      genderEquality,
      cleanWater,
      affordableEnergy,
      decentWork,
      industry,
      reducingInequalities,
      cities,
      production,
      climateAction,
      underwaterLife,
      terrestrialEcosystemLife,
      peace,
      alliances,
      livingConditions,
      lifeQuality,
      capacityBuilding,
      supportType,
      supportScope,
      resilienceBuilding,
      socialBackwardness,
      communitySense,
      sustainabilityProcesses,
      statusImprovement,
      urbanDevelopment,
      professionalizationProcess,
      opportunityGeneration,
      facebook,
      instagram,
      linkedin,
      twitter,
      tiktok,
      youtube,
      webpage,
      ethicalCode,
      governanceManual,
      timelineActivities,
      workWithMinors,
      officialLetterOfAuthorizationOfDonees,
      // updatedCertificate,
      publicationInAnnex14OfTheCurrentRMF,
      constituentAct,
      mostRecentMeeting,
      legalRepresentativesPower,
      legalRepresentativesId,
      // documentRFC,
      oldProofOfAddress,
      updatedComplianceOpinion,
      proofOfUpdatedTaxSituation,
      logo,
      subscribe,
    } = this.form.value;

    const body = {
      generalProjectData: {
        projectName: projectName,
        category: [category],
      },
      location: {
        locationIsVirtual: locationQuestion,
        streetAndNumber: street,
        colony: colony,
        municipality: town,
        status: state,
        postalCode: postalCode,
        urlProyect: video,
        daysAndHoursOfAttention: this.openingHours,
        howDidYouFindOutAboutTheCall: [aboutCall],
        whichMeans: whichMedia,
      },
      projectManager: {
        responsibleName: responsibleName,
        emailOfTheProjectManager: emails,
        cellPhoneOfTheProjectManager: phone,
      },
      projectDevelopment: {
        socialProblem: whichProblem,
        generalObjective: generalObjective,
        numberOfBeneficiaries: numberOfBeneficiaries,
        receiveCollaboration: collaborationWithOtherOrganizations,
        which: collaboratorsAnswer,
        currentPopulation: populationsConditionsBefore,
        conditionsAfterTheIntervention: populationsConditionsAfter,
        socialBetterment: promoteSocialImprovement,
      },
      validity: {
        startDate,
        endDate,
      },
      objectivesAndGoals: {
        sustainableDevelopmentGoals: objectives === '' ? null : objectives,
        endOfPoverty: povertyEnd,
        zeroHunger: zeroHunger,
        healthAndWellness: healthAndWellness,
        qualityEducation: qualityEducation,
        genderEquality: genderEquality,
        cleanWaterAndSanitation: cleanWater,
        affordableEnergy: affordableEnergy,
        decentWorkAndEconomicGrowth: decentWork,
        industry: industry,
        reductionOfInequality: reducingInequalities,
        sustainableCitiesandCommunities: cities,
        responsibleProductionAndConsumption: production,
        climateAction: climateAction,
        submarineLife: underwaterLife,
        lifeOfTerrestrialEcosystems: terrestrialEcosystemLife,
        peaceAndJustice: peace,
        alliancesToAchieveObjectives: alliances,
      },
      projectBudget: {
        organizationContribution: this.contributions,
        jointVenture: this.conversions,
        donationDeaceroFoundation: this.donations,
      },
      selfAppraisal: {
        improveLivingConditions: livingConditions,
        improvementInQualityOfLife: lifeQuality,
        selfManagementSkills: capacityBuilding,
        supportType: supportType,
        scopeOfSupport: supportScope,
        resilienceBuilding: resilienceBuilding,
        socialLag: socialBackwardness,
        developmentOfCapacitiesForSelfManagement: capacityBuilding,
        developmentOfSenseOfCommunity: communitySense,
        sustainabilityProcess: sustainabilityProcesses,
        improvementInTheStateOfTheOrganization: statusImprovement,
        urbanDevelopment: urbanDevelopment,
        professionalizationProcess: professionalizationProcess,
        generationOfOpportunities: opportunityGeneration,
      },
      communication: {
        facebook: facebook,
        instagram: instagram,
        linkedln: linkedin,
        twitter: twitter,
        tiktok: tiktok,
        youtube: youtube,
        webpage: webpage,
      },
      documents: {
        codeOfEthics: ethicalCode,
        governanceHandbook: governanceManual,
        scheduleOfActivities: timelineActivities,
        workWithMinors: workWithMinors,
        officialLetterOfAuthorizationOfDonees:
          officialLetterOfAuthorizationOfDonees,
        // updatedCertificate: updatedCertificate,
        publicationInAnnex14OfTheCurrentRMF:
          publicationInAnnex14OfTheCurrentRMF,
        constitutiveActOfTheOrganization: constituentAct,
        mostRecentMeetingMinutes: mostRecentMeeting,
        powerOfLegalRepresentative: legalRepresentativesPower,
        officialIdentificationOfLegalRepresentative: legalRepresentativesId,
        // documentRFC: documentRFC,
        oldProofOfAddress: oldProofOfAddress,
        updatedComplianceOpinion: updatedComplianceOpinion,
        proofOfUpdatedTaxSituation: proofOfUpdatedTaxSituation,
        logo: logo,
        doYouWanToSubscribe: subscribe,
      },
    };
    const sub = this.callService.applicateToCall(body).subscribe(() => {
      if (updateAndSave) {
        this.saveInFlokzu()?.subscribe({
          next: () => {
            this.infoSubmitted$.next(true);
          },
          error: error => {
            this.infoSubmitted$.next(true);
            this.open(modal);
            console.error(error);
          },
          complete: () => {
            this.open(modal);
          },
        });
      }
    });
    this.unsubscribe.push(sub);
  }

  saveInFlokzu() {
    if (this.form.invalid) return;
    this.save();
    const sub = this.callService.saveInFlokzu();
    return sub;
  }
  /**
   * Refactor
   */

  protected get validateIfFormDataIsEmpty(): boolean {
    for (const form in this.formData) {
      return Object.keys(this.formData[form as keyof CallsForm]).length !== 0;
    }
    return false;
  }

  getApplication() {
    this.callsService
      .get()
      .pipe(catchError(error => throwError(() => Error(error))))
      .subscribe({
        next: (formsData: CallsForm) => {
          console.log(formsData);
          this.formData = formsData;
        },
        error: error => console.error(error),
      });
  }

  updateData = <T>(form: T, isFormValid: FormValid) => {
    const sectionName = isFormValid.name as keyof CallsForm;
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
}
