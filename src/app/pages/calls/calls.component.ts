import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import Member from 'src/app/lib/models/member.model';
import Remuneration from 'src/app/lib/models/remuneration.model';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent {
  form: FormGroup;
  members: Member[] = [];
  remunerations: Remuneration[] = [];

  constructor() {
    this.form = new FormGroup({
      meetings: new FormControl(null, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
      renewalFrequency: new FormControl(null, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
    });
  }

  get f() {
    return this.form.controls;
  }

  save() {
    console.log(this.form.value);
    console.log(this.members);
    console.log(this.remunerations);
  }
}
