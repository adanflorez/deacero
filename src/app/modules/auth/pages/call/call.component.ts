import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit {
  callForm!: FormGroup;

  ngOnInit(): void {
    this.callForm = new FormGroup({
      acceptTerms: new FormControl(false, Validators.requiredTrue),
      convocatoría: new FormControl(false, Validators.requiredTrue),
    });
  }
}
