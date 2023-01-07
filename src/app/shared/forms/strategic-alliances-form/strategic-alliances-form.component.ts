import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import FormValid from 'src/app/lib/models/form-valid.model';
import StrategicAlliancesForm from 'src/app/lib/models/strategic-alliances-form.model';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import { AlertType } from 'src/app/lib/enums/alert-type';
import Donation from 'src/app/lib/models/donation.model';
import Product from 'src/app/lib/models/product.model';

@Component({
  selector: 'app-strategic-alliances-form',
  templateUrl: './strategic-alliances-form.component.html',
  styleUrls: ['./strategic-alliances-form.component.scss'],
})
export class StrategicAlliancesFormComponent implements OnInit, OnDestroy {
  @Input() updateParentModel: (
    part: StrategicAlliancesForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: StrategicAlliancesForm;
  form: FormGroup;
  alertType: AlertType = AlertType.Warning;
  showDonationsTable: boolean;
  donations: Donation[];
  products: Product[];

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.showDonationsTable = true;
    this.donations = [];
    this.products = [];
    this.form = new FormGroup({});
    this.defaultValues = {};
  }

  ngOnInit(): void {
    this.initForm();
    this.initDonations();
    this.initProducts();
    this.updateParentModel({}, this.isValidForm);
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

  get f() {
    return this.form.controls;
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.STRATEGIC_ALLIANCES,
      valid:
        this.form.valid &&
        this.products.length > 0 &&
        (this.f['previousDonations'].value ? this.donations.length > 0 : true),
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
      previousDonations: new FormControl(
        this.defaultValues.previousDonations || true
      ),
      strategicalAlliances: new FormControl(
        this.defaultValues.strategicalAlliances,
        Validators.required
      ),
    });
    this.subscribeToForm();
    this.subscribeToIssues();
    this.subscribeToPreviousDonations();
    this.form.markAllAsTouched();
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
        this.donations = [];
      });
    this.unsubscribe.push(sub as Subscription);
  }

  updateDonations(donations: Donation[]) {
    this.donations = donations;
    const data = {
      ...this.form.value,
      products: this.products,
      donations: this.donations,
    };
    this.updateParentModel(data, this.isValidForm);
  }

  updateProducts(products: Product[]) {
    this.products = products;
    const data = {
      ...this.form.value,
      products: this.products,
      donations: this.donations,
    };
    this.updateParentModel(data, this.isValidForm);
  }
}
