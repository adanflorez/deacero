import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MULTIPLE_EMAIL_PATTERN,
  OBJECTIVES,
  ONLY_NUMBERS_PATTERN,
  RATING,
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
    });
  }

  save() {
    console.log(this.form.value);
    console.log(this.members);
    console.log(this.remunerations);
  }

  private changeCategory() {
    // Reset previous controls
    this.resetPreviousRatings();
    switch (Number(this.f.category.value)) {
      case 1:
      case 3:
      case 4:
      case 16:
      case 19:
      case 20:
      case 24:
      case 25:
        this.groups = [
          'livingConditions',
          'lifeQuality',
          'capacityBuilding',
          'supportType',
          'supportScope',
          'resilienceBuilding',
        ];
        break;
      case 2:
      case 5:
      case 6:
      case 7:
      case 9:
      case 11:
      case 12:
      case 13:
      case 15:
      case 18:
      case 21:
      case 22:
      case 23:
        this.groups = [
          'socialBackwardness',
          'capacityBuilding',
          'communitySense',
          'sustainabilityProcesses',
        ];
        break;
      case 8:
      case 10:
      case 14:
      case 17:
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
}
