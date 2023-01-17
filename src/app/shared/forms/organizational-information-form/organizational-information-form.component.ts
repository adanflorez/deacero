import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MULTIPLE_EMAIL_PATTERN } from 'src/app/lib/constants';
import FormValid from 'src/app/lib/models/form-valid.model';
import OrganizationalInformationForm from 'src/app/lib/models/organizational-information-form.model';
import { CallSection } from 'src/app/lib/enums/sections.enum';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/lib/enums/alert-type';

@Component({
  selector: 'app-organizational-information-form',
  templateUrl: './organizational-information-form.component.html',
  styleUrls: ['./organizational-information-form.component.scss'],
})
export class OrganizationalInformationFormComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() updateParentModel: (
    part: OrganizationalInformationForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: OrganizationalInformationForm;
  @Input() disable: boolean;
  form: FormGroup;
  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];

  constructor() {
    this.form = new FormGroup({});
    this.defaultValues = {};
    this.disable = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, this.isValidForm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disable } = changes;
    if (disable?.currentValue) {
      this.form.disable();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  get f() {
    return this.form.controls;
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.ORGANIZATIONAL_INFORMATION,
      valid: this.form.valid,
    };
  }

  initForm() {
    this.form = new FormGroup({
      founder: new FormControl(this.defaultValues.founder, Validators.required),
      generalManagement: new FormControl(
        this.defaultValues.generalManagement,
        Validators.required
      ),
      operationalManagement: new FormControl(
        this.defaultValues.operationalManagement,
        Validators.required
      ),
      legalRepresentative: new FormControl(
        this.defaultValues.legalRepresentative,
        Validators.required
      ),
      legalRepresentativeEmail: new FormControl(
        this.defaultValues.legalRepresentativeEmail,
        [Validators.required, Validators.pattern(MULTIPLE_EMAIL_PATTERN)]
      ),
      operationsStartDate: new FormControl(
        this.defaultValues.operationsStartDate,
        Validators.required
      ),
      incorporationsStartDate: new FormControl(
        this.defaultValues.incorporationsStartDate,
        Validators.required
      ),
      mission: new FormControl(this.defaultValues.mission, Validators.required),
      vision: new FormControl(this.defaultValues.vision, Validators.required),
      ethicalValues: new FormControl(
        this.defaultValues.ethicalValues,
        Validators.required
      ),
    });
    this.subscribeToForm();
    this.form.markAllAsTouched();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel(val, this.isValidForm);
    });
    this.unsubscribe.push(sub);
  }
}
