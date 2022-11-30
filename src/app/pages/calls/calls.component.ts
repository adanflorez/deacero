import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MULTIPLE_EMAIL_PATTERN,
  OBJECTIVES,
  ONLY_NUMBERS_PATTERN,
  RATING,
  URL_PATTERN,
} from 'src/app/lib/constants';
import Member from 'src/app/lib/models/member.model';
import ProjectBudget from 'src/app/lib/models/project-budget.model';
import Remuneration from 'src/app/lib/models/remuneration.model';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  form: FormGroup;
  members: Member[] = [];
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

  contributions: ProjectBudget[] = [];
  conversions: ProjectBudget[] = [];
  donations: ProjectBudget[] = [];

  constructor() {
    this.initForm();
  }

  ngOnInit(): void {
    this.handleCategory();
    this.handleLocation();
    this.handleAboutCall();
    this.handleObjectives();
  }

  get f() {
    return this.form.controls;
  }

  private initForm() {
    this.form = new FormGroup({
      meetings: new FormControl(null, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
      renewalFrequency: new FormControl(null, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
      remunerationQuestion: new FormControl(true),
      projectName: new FormControl(null, [Validators.required]),
      category: new FormControl('', Validators.required),
      livingConditions: new FormControl(''),
      lifeQuality: new FormControl(''),
      capacityBuilding: new FormControl(''),
      supportType: new FormControl(''),
      supportScope: new FormControl(''),
      resilienceBuilding: new FormControl(''),
      socialBackwardness: new FormControl(''),
      communitySense: new FormControl(''),
      sustainabilityProcesses: new FormControl(''),
      statusImprovement: new FormControl(''),
      urbanDevelopment: new FormControl(''),
      professionalizationProcess: new FormControl(''),
      opportunityGeneration: new FormControl(''),
      locationQuestion: new FormControl(true),
      street: new FormControl('', Validators.required),
      colony: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      video: new FormControl('', Validators.required),
      daysAndHours: new FormControl('', Validators.required),
      aboutCall: new FormControl('', Validators.required),
      whichMedia: new FormControl(''),
      responsibleName: new FormControl('', Validators.required),
      emails: new FormControl('', [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      whichProblem: new FormControl('', Validators.required),
      generalObjective: new FormControl('', Validators.required),
      numberOfBeneficiaries: new FormControl('', Validators.required),
      collaborationWithOtherOrganizations: new FormControl(
        true,
        Validators.required
      ),
      collaboratorsAnswer: new FormControl('', Validators.required),
      populationsConditionsBefore: new FormControl('', Validators.required),
      populationsConditionsAfter: new FormControl('', Validators.required),
      promoteSocialImprovement: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      objectives: new FormControl('', Validators.required),
      povertyEnd: new FormControl(''),
      zeroHunger: new FormControl(''),
      healthAndWellness: new FormControl(''),
      qualityEducation: new FormControl(''),
      genderEquality: new FormControl(''),
      cleanWater: new FormControl(''),
      affordableEnergy: new FormControl(''),
      decentWork: new FormControl(''),
      industry: new FormControl(''),
      reducingInequalities: new FormControl(''),
      cities: new FormControl(''),
      production: new FormControl(''),
      climateAction: new FormControl(''),
      underwaterLife: new FormControl(''),
      terrestrialEcosystemLife: new FormControl(''),
      peace: new FormControl(''),
      alliances: new FormControl(''),
      facebook: new FormControl('', [Validators.pattern(URL_PATTERN)]),
      instagram: new FormControl('', [Validators.pattern(URL_PATTERN)]),
      linkedin: new FormControl('', [Validators.pattern(URL_PATTERN)]),
      twitter: new FormControl('', [Validators.pattern(URL_PATTERN)]),
      tiktok: new FormControl('', [Validators.pattern(URL_PATTERN)]),
      youtube: new FormControl('', [Validators.pattern(URL_PATTERN)]),
    });
  }

  private changeCategory() {
    // Reset previous controls
    this.resetPreviousRatings();
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
    this.groups.map((group) => {
      this.form.get(group)?.clearValidators();
      this.form.get(group)?.reset();
    });
  }

  private setValidatorsToRating() {
    this.groups.map((group) => {
      this.form.get(group)?.setValidators(Validators.required);
    });
  }

  private handleCategory() {
    const sub = this.form
      .get('category')
      ?.valueChanges.subscribe(() => this.changeCategory());
    this.unsubscribe.push(sub!);
  }

  private handleLocation() {
    const locationQuestionSub = this.form
      .get('locationQuestion')
      ?.valueChanges.subscribe((res) => {
        if (res) {
          this.locationFields.map((field) => {
            this.form.get(field)?.setValidators(Validators.required);
          });
        } else {
          this.locationFields.map((field) => {
            this.form.get(field)?.clearValidators();
            this.form.get(field)?.reset();
          });
        }
      });
    this.unsubscribe.push(locationQuestionSub!);
  }

  private handleAboutCall() {
    const sub = this.form.get('aboutCall')?.valueChanges.subscribe((res) => {
      if (res == 3) {
        this.form.get('whichMedia')?.setValidators(Validators.required);
      } else {
        this.form.get('whichMedia')?.clearValidators();
        this.form.get('whichMedia')?.reset();
      }
    });
    this.unsubscribe.push(sub!);
  }

  private handleObjectives() {
    this.resetObjectivesValidators();
    const sub = this.form.get('objectives')?.valueChanges.subscribe((val) => {
      this.objectivesOptions.map((_, index) => {
        if (val.includes(this.objectivesOptions[index])) {
          this.form
            .get(this.objectivesFields[index])
            ?.setValidators(Validators.required);
        }
      });
    });
    this.unsubscribe.push(sub!);
  }

  private resetObjectivesValidators() {
    this.objectivesFields.map((obj) => {
      this.form.get(obj)?.clearValidators();
      this.form.get(obj)?.reset();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  save() {
    const {
      meetings,
      renewalFrequency,
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
    } = this.form.value;

    const body = {
      governingBody: {
        membersOfTheGoverning: this.members,
        numberOfMeetingsPerYear: meetings,
        boardRenewalFrequency: renewalFrequency,
      },
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
        sustainableDevelopmentGoals: objectives,
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
    };
    console.log(body);
  }
}
