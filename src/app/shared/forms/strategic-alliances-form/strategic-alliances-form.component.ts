import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import FormValid from 'src/app/lib/models/form-valid.model';
import StrategicAlliancesForm from 'src/app/lib/models/strategic-alliances-form.model';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import { AlertType } from 'src/app/lib/enums/alert-type';

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

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.showDonationsTable = true;
    this.form = new FormGroup({});
    this.defaultValues = {};
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, this.isValidForm);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  get f() {
    return this.form.controls;
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.STRATEGIC_ALLIANCES,
      valid: this.form.valid,
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
  }

  private subscribeToForm(): void {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel(val, this.isValidForm);
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
      });
    this.unsubscribe.push(sub as Subscription);
  }
}
