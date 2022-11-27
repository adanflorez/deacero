import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnInit {
  form: FormGroup;
  members = [];

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

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  save() {
    console.log(this.form.value);
    console.log(this.members);
  }
}
