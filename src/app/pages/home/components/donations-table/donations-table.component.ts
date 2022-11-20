import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import { CustomValidators } from 'src/app/lib/helpers/custom-validators';
import { v4 as uuidv4 } from 'uuid';

interface Donation {
  id: string;
  year: string;
  amount: number;
  proyectName: string;
}
@Component({
  selector: 'app-donations-table',
  templateUrl: './donations-table.component.html',
  styleUrls: ['./donations-table.component.scss'],
})
export class DonationsTableComponent {
  form: FormGroup;
  showForm = false;
  validForm = false;
  @Input() donations: Donation[] = [];
  @Output() donationsList = new EventEmitter();
  donationToEdit: Donation;
  isEditMode = false;

  constructor() {
    this.form = new FormGroup({
      year: new FormControl('', [
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(4),
        CustomValidators.MaxDate()
      ]),
      amount: new FormControl('', Validators.pattern(ONLY_NUMBERS_PATTERN)),
      proyectName: new FormControl(''),
    });
    this.form.valueChanges.subscribe((values) => {
      const { year, amount, proyectName } = values;
      if (year || amount || proyectName) {
        this.validForm = this.form.valid && true;
        return;
      }
      this.validForm = false;
    });
  }

  showFormOnTable() {
    this.showForm = true;
  }

  addDonation() {
    if (!this.validForm) return;
    this.showForm = false;
    this.donations.push({
      id: uuidv4(),
      ...this.form.value,
    });
    this.donationsList.emit(this.donations);
    this.form.reset();
  }

  removeDonation(id: string) {
    this.donations = this.donations.filter((donation) => donation.id !== id);
    this.donationsList.emit(this.donations);
  }

  get f() {
    return this.form.controls;
  }

  loadDonationInFields(id: string) {
    const donations = this.donations.filter((donation) => donation.id === id);
    this.donationToEdit = donations[0];
    const { year, amount, proyectName } = donations[0];
    this.form.setValue({
      year,
      amount,
      proyectName,
    });
    this.showForm = true;
    this.isEditMode = true;
  }

  editDonation() {
    this.donationToEdit = { ...this.donationToEdit, ...this.form.value };
    this.donations = this.donations.filter(
      (donation) => donation.id !== this.donationToEdit.id
    );
    this.donations.push(this.donationToEdit);
    this.donationsList.emit(this.donations);
    this.showForm = false;
    this.isEditMode = false;
    this.form.reset();
  }

  cancelEdit() {
    this.showForm = false;
    this.isEditMode = false;
    this.form.reset();
  }
}
