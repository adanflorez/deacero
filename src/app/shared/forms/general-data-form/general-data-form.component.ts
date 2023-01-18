import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { validateRFC } from 'src/app/core/helpers/rfc-validator';
import {
  MULTIPLE_EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from 'src/app/core/constants';
import FormValid from 'src/app/core/models/form-valid.model';
import GeneralDataForm from 'src/app/core/models/general-data-form.model';
import { CallSection } from 'src/app/core/enums/sections.enum';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/core/enums/alert-type';

@Component({
  selector: 'app-general-data-form',
  templateUrl: './general-data-form.component.html',
  styleUrls: ['./general-data-form.component.scss'],
})
export class GeneralDataFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() updateParentModel: (
    part: GeneralDataForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: GeneralDataForm;
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
      name: CallSection.GENERAL_DATA,
      valid: this.form.valid,
    };
  }

  initForm() {
    this.form = new FormGroup({
      tradename: new FormControl(
        this.defaultValues.tradename,
        Validators.required
      ),
      businessname: new FormControl(
        this.defaultValues.businessname,
        Validators.required
      ),
      rfc: new FormControl(
        { value: this.defaultValues.rfc, disabled: true },
        Validators.required
      ),
      phone: new FormControl(this.defaultValues.phone, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      emails: new FormControl(this.defaultValues.emails, [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      position: new FormControl(this.defaultValues.position, [
        Validators.required,
      ]),
      accountBankManager: new FormControl(
        this.defaultValues.accountBankManager,
        [Validators.required]
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

  validateRFC(input: Event, control: AbstractControl) {
    validateRFC(input, control);
  }
}
