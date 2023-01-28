import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallSection } from 'src/app/core/enums/sections.enum';
import { Donation, Product } from 'src/app/core/models';
import FormValid from 'src/app/core/models/form-valid.model';
import { StrategicAllianceActivity } from 'src/app/core/models/strategic-alliances-activity.model';
import { AlertType } from 'src/app/shared/alert';

import { StrategicAlliancesForm } from './domain';

@Component({
  selector: 'app-strategic-alliances-form',
  templateUrl: './strategic-alliances-form.component.html',
  styleUrls: ['./strategic-alliances-form.component.scss'],
})
export class StrategicAlliancesFormComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() updateParentModel: (
    part: StrategicAlliancesForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: StrategicAlliancesForm;
  @Input() disable: boolean;
  form: FormGroup;
  alertType: AlertType = AlertType.Warning;
  showDonationsTable: boolean;
  donations: Donation[];
  products: Product[];
  strategicAlliancesActivities: StrategicAllianceActivity[];

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.showDonationsTable = true;
    this.donations = [];
    this.products = [];
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.disable = false;
    this.strategicAlliancesActivities = [];
  }

  ngOnInit(): void {
    this.initForm();
    this.initDonations();
    this.initProducts();
    this.initStrategicAlliancesActivities();
    this.updateParentModel({}, this.isValidForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disable } = changes;
    if (disable?.currentValue) {
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  initDonations() {
    this.donations = (this.defaultValues?.donations as Donation[]) || [];
  }

  initProducts() {
    this.products = (this.defaultValues?.products as Product[]) || [];
  }

  initStrategicAlliancesActivities() {
    this.strategicAlliancesActivities =
      (this.defaultValues
        ?.strategicalAlliances as StrategicAllianceActivity[]) || [];
  }

  get f() {
    return this.form.controls;
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.STRATEGIC_ALLIANCES,
      valid:
        this.form.valid &&
        this.products.length > 0 &&
        (this.f['previousDonations'].value
          ? this.donations.length > 0
          : true) &&
        this.strategicAlliancesActivities.length >= 5,
    };
  }

  private initForm(): void {
    this.form = new FormGroup({
      alliances: new FormControl(this.defaultValues.alliances),
      courses: new FormControl(this.defaultValues.courses, Validators.required),
      issuesToStrengthen: new FormControl(
        this.defaultValues.issuesToStrengthen,
        Validators.required
      ),
      whichTopics: new FormControl(
        { value: this.defaultValues.whichTopics, disabled: true },
        Validators.required
      ),
      previousDonations: new FormControl(true),
    });
    this.subscribeToForm();
    this.subscribeToIssues();
    this.subscribeToPreviousDonations();
    this.form.markAllAsTouched();
    this.disable && this.form.disable();
  }

  private subscribeToForm(): void {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel(
        { ...val, donations: this.donations, products: this.products },
        this.isValidForm
      );
    });
    this.unsubscribe.push(sub);
  }

  private subscribeToIssues(): void {
    const sub = this.form
      .get('issuesToStrengthen')
      ?.valueChanges.subscribe((res: string[]) => {
        if (res.includes('Otros')) {
          this.f['whichTopics'].enable();
          return;
        }
        this.f['whichTopics'].disable();
        this.f['whichTopics'].reset();
      });
    this.unsubscribe.push(sub as Subscription);
  }

  private subscribeToPreviousDonations(): void {
    const sub = this.form
      .get('previousDonations')
      ?.valueChanges.subscribe((check: boolean) => {
        this.showDonationsTable = check;
        !check && (this.donations = []);
      });
    this.unsubscribe.push(sub as Subscription);
  }

  updateDonations(donations: Donation[]) {
    this.donations = donations;
    const data = {
      ...this.form.value,
      products: this.products,
      donations: this.donations,
      strategicalAlliances: this.strategicAlliancesActivities,
    };
    this.updateParentModel(data, this.isValidForm);
  }

  updateProducts(products: Product[]) {
    this.products = products;
    const data = {
      ...this.form.value,
      products: this.products,
      donations: this.donations,
      strategicalAlliances: this.strategicAlliancesActivities,
    };
    this.updateParentModel(data, this.isValidForm);
  }

  updateStrategicAlliancesActivities(
    strategicAlliancesActivities: StrategicAllianceActivity[]
  ) {
    this.strategicAlliancesActivities = strategicAlliancesActivities;
    const data = {
      ...this.form.value,
      products: this.products,
      donations: this.donations,
      strategicalAlliances: this.strategicAlliancesActivities,
    };
    this.updateParentModel(data, this.isValidForm);
  }
}
