import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ONLY_NUMBERS_PATTERN, RATING } from 'src/app/lib/constants';
import Member from 'src/app/lib/models/member.model';
import Remuneration from 'src/app/lib/models/remuneration.model';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  form: FormGroup;
  members: Member[] = [];
  remunerations: Remuneration[] = [];
  groups: string[] = [];
  rating = RATING;
  locationFields = ['street', 'colony', 'town', 'state', 'postalCode'];

  constructor() {
    this.initForm();
    this.handleCategory();
    this.handleLocation();
    this.handleAboutCall();
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
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
    });
  }

  save() {
    console.log(this.form.value);
    console.log(this.members);
    console.log(this.remunerations);
  }

  changeCategory() {
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

  resetPreviousRatings() {
    this.groups.map((group) => {
      this.form.get(group)?.clearValidators();
      this.form.get(group)?.reset();
    });
  }

  setValidatorsToRating() {
    this.groups.map((group) => {
      this.form.get(group)?.setValidators(Validators.required);
    });
  }

  handleCategory() {
    const sub = this.form
      .get('category')
      ?.valueChanges.subscribe(() => this.changeCategory());
    this.unsubscribe.push(sub!);
  }

  handleLocation() {
    const locationQuestionSub = this.form
      .get('locationQuestion')
      ?.valueChanges.subscribe((res) => {
        if (res) {
          this.locationFields.map((field) => {
            this.form.get(field)?.setValidators(Validators.required);
          });
        } else {
          console.log('apagado');
          this.locationFields.map((field) => {
            this.form.get(field)?.clearValidators();
            this.form.get(field)?.reset();
          });
        }
      });
    this.unsubscribe.push(locationQuestionSub!);
  }

  handleAboutCall() {
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

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
