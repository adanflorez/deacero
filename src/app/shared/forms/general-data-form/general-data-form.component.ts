import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { validateRFC } from 'src/app/lib/helpers/rfc-validator';
import {
  MULTIPLE_EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from 'src/app/lib/constants';

@Component({
  selector: 'app-general-data-form',
  templateUrl: './general-data-form.component.html',
  styleUrls: ['./general-data-form.component.scss'],
})
export class GeneralDataFormComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({});
  }

  get f() {
    return this.form.controls;
  }

  initForm() {
    this.form = new FormGroup({
      tradename: new FormControl('', Validators.required),
      businessname: new FormControl('', Validators.required),
      rfc: new FormControl({ value: '', disabled: true }, Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(12),
      ]),
      emails: new FormControl('', [
        Validators.required,
        Validators.pattern(MULTIPLE_EMAIL_PATTERN),
      ]),
      position: new FormControl('', [Validators.required]),
    });
  }

  validateRFC(input: Event, control: AbstractControl) {
    validateRFC(input, control);
  }
}
