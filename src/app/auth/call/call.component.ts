import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    });
  }
}
