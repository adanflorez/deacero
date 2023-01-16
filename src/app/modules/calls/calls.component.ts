import { UserService } from 'src/app/core/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  MULTIPLE_EMAIL_PATTERN,
  OBJECTIVES,
  ONLY_NUMBERS_PATTERN,
  RATING,
  URL_PATTERN,
} from 'src/app/core/constants';
import Member from 'src/app/core/models/member.model';
import ProjectBudget from 'src/app/core/models/project-budget.model';
import Remuneration from 'src/app/core/models/remuneration.model';
import Response from 'src/app/core/models/response.model';
import { MultimediaService } from 'src/app/core/services/multimedia.service';
import { CallService } from 'src/app/core/services/call.service';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  form!: FormGroup;
  remunerations: Remuneration[] = [];
  groups: string[] = [];
  categories = [
    'Alimentación',
    'Asistencia jurídica',
    'Asistencia o rehabilitación médica',
    'Atención a grupos sociales con discapacidad',
    'Becas',
    'Defensa y promoción de los DH',
    'Desarrollo comunidades indígenas.',
    'Desarrollo Institucional',
    'Desarrollo urbano',
    'Detonación de oportunidades para la resiliencia económica.',
    'Ecología',
    'Educación',
    'Empoderamiento social',
    'Equipamiento',
    'Fomento educativo',
    'Inclusión',
    'Infraestructura',
    'Medio ambiente',
    'Nutrición',
    'Orientación social',
    'Participación ciudadana.',
    'Promoción y difusión cultural',
    'Reinserción social',
    'Salud mental',
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
  tempDocumentUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  closeResult: string;
  hideForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call: any = undefined;
  infoSubmitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private multimediaService: MultimediaService,
    private modalService: NgbModal,
    private callService: CallService,
    private userService: UserService
  ) {
    this.closeResult = '';
  }

  ngOnInit(): void {
    this.userService.OSCstatus().subscribe({
      next: res => {
        if (res.data) {
          this.loadApplication();
        } else {
          this.hideForm$.next(true);
        }
      },
      error: error => console.error(error),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      complete: () => {},
    });
  }

  get f() {
    return this.form.controls;
  }

  get isValidForm(): boolean {
    return (
      this.form.valid &&
      (this.f['remunerationQuestion'].value
        ? this.remunerations.length > 0
        : true) &&
      this.contributions.length > 0 &&
      this.conversions.length > 0 &&
      this.donations.length > 0
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseResponse(res: any) {
    this.remunerations = res?.remunerations.tableRemunerations || [];
    this.contributions = res?.projectBudget.organizationContribution || [];
    this.conversions = res?.projectBudget.jointVenture || [];
    this.donations = res?.projectBudget.donationDeaceroFoundation || [];
    this.call = {
      // Remunerations
      remunerationQuestion: res?.remunerations.workInYourOrganizationIsPaid,
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
      daysAndHours: res?.location.daysAndHoursOfAttention,
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
      // Documents
      ethicalCode: res?.documents.codeOfEthics,
      governanceManual: res?.documents.governanceHandbook,
      timelineActivities: res?.documents.scheduleOfActivities,
      workWithMinors: res?.documents.workWithMinors,
      officialLetterOfAuthorizationOfDonees:
        res?.documents.officialLetterOfAuthorizationOfDonees,
      updatedCertificate: res?.documents.updatedCertificate,
      publicationInAnnex14OfTheCurrentRMF:
        res?.documents.publicationInAnnex14OfTheCurrentRMF,
      constituentAct: res?.documents.constitutiveActOfTheOrganization,
      mostRecentMeeting: res?.documents.mostRecentMeetingMinutes,
      legalRepresentativesPower: res?.documents.powerOfLegalRepresentative,
      legalRepresentativesId:
        res?.documents.officialIdentificationOfLegalRepresentative,
      documentRFC: res?.documents.documentRFC,
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

  private initForm() {
    this.form = new FormGroup({
      remunerationQuestion: new FormControl(
        this.call?.remunerationQuestion == null
          ? true
          : this.call?.remunerationQuestion
      ),
      projectName: new FormControl(this.call?.projectName, [
        Validators.required,
      ]),
      category: new FormControl(this.call?.category, Validators.required),
      livingConditions: new FormControl(this.call?.livingConditions),
      lifeQuality: new FormControl(this.call?.lifeQuality),
      capacityBuilding: new FormControl(this.call?.capacityBuilding),
      supportType: new FormControl(this.call?.supportType),
      supportScope: new FormControl(this.call?.supportScope),
      resilienceBuilding: new FormControl(this.call?.resilienceBuilding),
      socialBackwardness: new FormControl(this.call?.socialBackwardness),
      communitySense: new FormControl(this.call?.communitySense),
      sustainabilityProcesses: new FormControl(
        this.call?.sustainabilityProcesses
      ),
      statusImprovement: new FormControl(this.call?.statusImprovement),
      urbanDevelopment: new FormControl(this.call?.urbanDevelopment),
      professionalizationProcess: new FormControl(
        this.call?.professionalizationProcess
      ),
      opportunityGeneration: new FormControl(this.call?.opportunityGeneration),
      locationQuestion: new FormControl(
        this.call?.locationQuestion == null ? true : this.call?.locationQuestion
      ),
      street: new FormControl(this.call?.street, Validators.required),
      colony: new FormControl(this.call?.colony, Validators.required),
      town: new FormControl(this.call?.town, Validators.required),
      state: new FormControl(this.call?.state, Validators.required),
      postalCode: new FormControl(this.call?.postalCode, Validators.required),
      video: new FormControl(this.call?.video, Validators.required),
      daysAndHours: new FormControl(
        this.call?.daysAndHours,
        Validators.required
      ),
      aboutCall: new FormControl(this.call?.aboutCall, Validators.required),
      whichMedia: new FormControl(this.call?.whichMedia),
      responsibleName: new FormControl(
        this.call?.responsibleName,
        Validators.required
      ),
      emails: new FormControl(this.call?.emails, [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      phone: new FormControl(this.call?.phone, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      whichProblem: new FormControl(
        this.call?.whichProblem,
        Validators.required
      ),
      generalObjective: new FormControl(
        this.call?.generalObjective,
        Validators.required
      ),
      numberOfBeneficiaries: new FormControl(this.call?.numberOfBeneficiaries, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
      collaborationWithOtherOrganizations: new FormControl(
        this.call?.collaborationWithOtherOrganizations
      ),
      collaboratorsAnswer: new FormControl(
        this.call?.collaboratorsAnswer,
        Validators.required
      ),
      populationsConditionsBefore: new FormControl(
        this.call?.populationsConditionsBefore,
        Validators.required
      ),
      populationsConditionsAfter: new FormControl(
        this.call?.populationsConditionsAfter,
        Validators.required
      ),
      promoteSocialImprovement: new FormControl(
        this.call?.promoteSocialImprovement,
        Validators.required
      ),
      startDate: new FormControl(this.call?.startDate, Validators.required),
      endDate: new FormControl(this.call?.endDate, Validators.required),
      objectives: new FormControl(
        this.call?.objectives || '',
        Validators.required
      ),
      povertyEnd: new FormControl(this.call?.povertyEnd),
      zeroHunger: new FormControl(this.call?.zeroHunger),
      healthAndWellness: new FormControl(this.call?.healthAndWellness),
      qualityEducation: new FormControl(this.call?.qualityEducation),
      genderEquality: new FormControl(this.call?.genderEquality),
      cleanWater: new FormControl(this.call?.cleanWater),
      affordableEnergy: new FormControl(this.call?.affordableEnergy),
      decentWork: new FormControl(this.call?.decentWork),
      industry: new FormControl(this.call?.industry),
      reducingInequalities: new FormControl(this.call?.reducingInequalities),
      cities: new FormControl(this.call?.cities),
      production: new FormControl(this.call?.production),
      climateAction: new FormControl(this.call?.climateAction),
      underwaterLife: new FormControl(this.call?.underwaterLife),
      terrestrialEcosystemLife: new FormControl(
        this.call?.terrestrialEcosystemLife
      ),
      peace: new FormControl(this.call?.peace),
      alliances: new FormControl(this.call?.alliances),
      facebook: new FormControl(this.call?.facebook, [
        Validators.pattern(URL_PATTERN),
      ]),
      instagram: new FormControl(this.call?.instagram, [
        Validators.pattern(URL_PATTERN),
      ]),
      linkedin: new FormControl(this.call?.linkedin, [
        Validators.pattern(URL_PATTERN),
      ]),
      twitter: new FormControl(this.call?.twitter, [
        Validators.pattern(URL_PATTERN),
      ]),
      tiktok: new FormControl(this.call?.tiktok, [
        Validators.pattern(URL_PATTERN),
      ]),
      youtube: new FormControl(this.call?.youtube, [
        Validators.pattern(URL_PATTERN),
      ]),
      webpage: new FormControl(this.call?.youtube, [
        Validators.pattern(URL_PATTERN),
      ]),
      ethicalCode: new FormControl(this.call?.ethicalCode),
      governanceManual: new FormControl(this.call?.governanceManual),
      timelineActivities: new FormControl(
        this.call?.timelineActivities,
        Validators.required
      ),
      workWithMinors: new FormControl(this.call?.workWithMinors),
      officialLetterOfAuthorizationOfDonees: new FormControl(
        this.call?.officialLetterOfAuthorizationOfDonees,
        Validators.required
      ),
      updatedCertificate: new FormControl(
        this.call?.updatedCertificate,
        Validators.required
      ),
      publicationInAnnex14OfTheCurrentRMF: new FormControl(
        this.call?.publicationInAnnex14OfTheCurrentRMF,
        Validators.required
      ),
      constituentAct: new FormControl(
        this.call?.constituentAct,
        Validators.required
      ),
      mostRecentMeeting: new FormControl(this.call?.mostRecentMeeting),
      legalRepresentativesPower: new FormControl(
        this.call?.legalRepresentativesPower
      ),
      legalRepresentativesId: new FormControl(
        this.call?.legalRepresentativesId,
        Validators.required
      ),
      documentRFC: new FormControl(this.call?.documentRFC, Validators.required),
      oldProofOfAddress: new FormControl(
        this.call?.oldProofOfAddress,
        Validators.required
      ),
      updatedComplianceOpinion: new FormControl(
        this.call?.updatedComplianceOpinion,
        Validators.required
      ),
      proofOfUpdatedTaxSituation: new FormControl(
        this.call?.proofOfUpdatedTaxSituation,
        Validators.required
      ),
      logo: new FormControl(this.call?.logo, Validators.required),
      subscribe: new FormControl(this.call?.subscribe),
    });

    this.handleCategory();
    this.handleLocation();
    this.handleAboutCall();
    this.handleObjectives();
    this.handleRemunerationQuestion();
    this.initDocuments();
    this.changeCategory();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.callService.status().subscribe((res: unknown) => {
        if ((res as Response<unknown>).data) {
          this.form.disable();
          this.infoSaved$.next(true);
        }
      });
    }
  }

  initDocuments() {
    this.documentsFields = [
      {
        field: 'ethicalCode',
        name: 'Código de ética',
        help: 'PDF legible',
      },
      {
        field: 'governanceManual',
        name: 'Manual de gobernanza',
        help: 'PDF legible',
      },
      {
        field: 'timelineActivities',
        name: 'Cronograma de actividades',
        help: 'PDF legible',
      },
      {
        field: 'workWithMinors',
        name: 'En caso de trabajar con menores de edad, adjuntar las políticas, normas, reglamentos o protocolos que aseguren su bienestar',
        help: 'PDF legible',
      },
      {
        field: 'officialLetterOfAuthorizationOfDonees',
        name: 'Oficio de autorización de donatarias SAT (vigente)',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
      {
        field: 'updatedCertificate',
        name: 'Constancia actualizada del Registro Federal de Contribuyentes',
        help: 'PDF legible',
      },
      {
        field: 'publicationInAnnex14OfTheCurrentRMF',
        name: 'Publicación en el Anexo-14 de la RMF vigente',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
      {
        field: 'constituentAct',
        name: 'Acta constitutiva de la organización',
        help: 'PDF legible',
      },
      {
        field: 'mostRecentMeeting',
        name: 'Acta de asamblea más reciente',
        help: 'PDF legible',
      },
      {
        field: 'legalRepresentativesPower',
        name: 'Poder del (los) representante(s) legal(es)',
        help: 'PDF legible',
      },
      {
        field: 'legalRepresentativesId',
        name: 'Identificación oficial del representante legal',
        help: 'PDF legible',
      },
      {
        field: 'documentRFC',
        name: 'Cédula del RFC',
        help: 'PDF legible',
      },
      {
        field: 'oldProofOfAddress',
        name: 'Comprobante de domicilio con antigüedad no mayor a 3 meses (agua, luz, teléfono)',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
      {
        field: 'updatedComplianceOpinion',
        name: 'Opinión de cumplimiento actualizada',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
      {
        field: 'proofOfUpdatedTaxSituation',
        name: 'Constancia de situación fiscal actualizada',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
    ];
  }

  private changeCategory() {
    // Reset previous controls
    // this.resetPreviousRatings();
    switch (this.f.category.value) {
      case this.categories[0]:
      case this.categories[2]:
      case this.categories[3]:
      case this.categories[15]:
      case this.categories[18]:
      case this.categories[19]:
      case this.categories[23]:
      case this.categories[24]:
        this.groups = [
          'livingConditions',
          'lifeQuality',
          'capacityBuilding',
          'supportType',
          'supportScope',
          'resilienceBuilding',
        ];
        break;
      case this.categories[1]:
      case this.categories[4]:
      case this.categories[5]:
      case this.categories[6]:
      case this.categories[8]:
      case this.categories[10]:
      case this.categories[11]:
      case this.categories[12]:
      case this.categories[14]:
      case this.categories[17]:
      case this.categories[20]:
      case this.categories[21]:
      case this.categories[22]:
        this.groups = [
          'socialBackwardness',
          'capacityBuilding',
          'communitySense',
          'sustainabilityProcesses',
        ];
        break;
      case this.categories[7]:
      case this.categories[9]:
      case this.categories[13]:
      case this.categories[16]:
        this.groups = [
          'statusImprovement',
          'urbanDevelopment',
          'professionalizationProcess',
          'opportunityGeneration',
        ];
        break;
      default:
        this.groups = [];
        break;
    }
    // Set validators to current controls
    this.setValidatorsToRating();
  }

  private resetPreviousRatings() {
    this.groups.forEach(group => {
      this.form.get(group)?.clearValidators();
      this.form.get(group)?.reset();
    });
  }

  private setValidatorsToRating() {
    this.groups.forEach(group => {
      this.form.get(group)?.setValidators(Validators.required);
    });
  }

  private handleCategory() {
    const sub = this.form
      .get('category')
      ?.valueChanges.subscribe(() => this.changeCategory());
    this.unsubscribe.push(sub as Subscription);
  }

  private handleLocation() {
    if (!this.f.locationQuestion.value) {
      this.locationFields.forEach(field => {
        this.form.get(field)?.setValidators(Validators.required);
        this.form.get(field)?.reset();
      });
    } else {
      this.locationFields.forEach(field => {
        this.form.get(field)?.clearValidators();
      });
    }
    const locationQuestionSub = this.form
      .get('locationQuestion')
      ?.valueChanges.subscribe(res => {
        if (!res) {
          this.locationFields.forEach(field => {
            this.form.get(field)?.setValidators(Validators.required);
            this.form.get(field)?.reset();
          });
        } else {
          this.locationFields.forEach(field => {
            this.form.get(field)?.clearValidators();
          });
        }
      });
    this.unsubscribe.push(locationQuestionSub as Subscription);
  }

  private handleAboutCall() {
    const sub = this.form.get('aboutCall')?.valueChanges.subscribe(res => {
      if (res == 3) {
        this.form.get('whichMedia')?.setValidators(Validators.required);
      } else {
        this.form.get('whichMedia')?.clearValidators();
        this.form.get('whichMedia')?.reset();
      }
    });
    this.unsubscribe.push(sub as Subscription);
  }

  private handleObjectives() {
    const sub = this.form.get('objectives')?.valueChanges.subscribe(val => {
      this.objectivesOptions.forEach((_, index) => {
        if (val.includes(this.objectivesOptions[index])) {
          this.form
            .get(this.objectivesFields[index])
            ?.setValidators(Validators.required);
        } else {
          this.form.get(this.objectivesFields[index])?.clearValidators();
          this.form.get(this.objectivesFields[index])?.reset();
        }
      });
    });
    this.unsubscribe.push(sub as Subscription);
  }

  private handleRemunerationQuestion() {
    const sub = this.form
      .get('remunerationQuestion')
      ?.valueChanges.subscribe(res => {
        if (!res) {
          this.remunerations = [];
        }
      });
    this.unsubscribe.push(sub as Subscription);
  }

  uploadDocument(e: Event, control: string, isImage = false) {
    if (!this.fileValidation(control, isImage)) return;
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    formData.append('file', (e.target as HTMLInputElement).files![0]);
    this.multimediaService.upload(formData).subscribe({
      next: (res: unknown) => {
        this.tempDocumentUrl.next((res as Response<unknown>).data as string);
      },
      error: error => console.error(error),
      complete: () => {
        const sub = this.tempDocumentUrl.asObservable().subscribe(res => {
          if (!this.f[control].value) {
            this.f[control].setValue(res);
          }
        });
        sub.unsubscribe();
      },
    });
  }

  private fileValidation(inputId: string, isImage?: boolean): boolean {
    let allowedExtensions = /(\.pdf)$/i;
    let message = 'El archivo debe ser de extension .pdf';
    if (isImage) {
      allowedExtensions = /(\.png|\.ai|\.svg|\.pdf|\.jpg|\.jpeg)$/i;
      message = 'El archivo debe ser de extension .jpg, .pdf, .png, .ai o .svg';
    }
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    const filePath = fileInput?.value;
    if (!allowedExtensions.exec(filePath)) {
      alert(message);
      fileInput.value = '';
      return false;
    }
    return true;
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
      remunerationQuestion,
      projectName,
      category,
      locationQuestion,
      street,
      colony,
      town,
      state,
      postalCode,
      video,
      daysAndHours,
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
      ethicalCode,
      governanceManual,
      timelineActivities,
      workWithMinors,
      officialLetterOfAuthorizationOfDonees,
      updatedCertificate,
      publicationInAnnex14OfTheCurrentRMF,
      constituentAct,
      mostRecentMeeting,
      legalRepresentativesPower,
      legalRepresentativesId,
      documentRFC,
      oldProofOfAddress,
      updatedComplianceOpinion,
      proofOfUpdatedTaxSituation,
      logo,
      subscribe,
    } = this.form.value;

    const body = {
      remunerations: {
        workInYourOrganizationIsPaid: remunerationQuestion,
        tableRemunerations: this.remunerations,
      },
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
        daysAndHoursOfAttention: daysAndHours,
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
      },
      documents: {
        codeOfEthics: ethicalCode,
        governanceHandbook: governanceManual,
        scheduleOfActivities: timelineActivities,
        workWithMinors: workWithMinors,
        officialLetterOfAuthorizationOfDonees:
          officialLetterOfAuthorizationOfDonees,
        updatedCertificate: updatedCertificate,
        publicationInAnnex14OfTheCurrentRMF:
          publicationInAnnex14OfTheCurrentRMF,
        constitutiveActOfTheOrganization: constituentAct,
        mostRecentMeetingMinutes: mostRecentMeeting,
        powerOfLegalRepresentative: legalRepresentativesPower,
        officialIdentificationOfLegalRepresentative: legalRepresentativesId,
        documentRFC: documentRFC,
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
            this.loadApplication();
          },
        });
      } else {
        this.loadApplication();
      }
    });
    this.unsubscribe.push(sub);
  }

  loadApplication() {
    const sub = this.callService.application().subscribe((res: unknown) => {
      this.parseResponse((res as Response<unknown>).data);
      this.initForm();
    });
    this.unsubscribe.push(sub);
  }

  saveInFlokzu() {
    if (this.form.invalid) return;
    this.save();
    const sub = this.callService.saveInFlokzu();
    return sub;
  }
}
