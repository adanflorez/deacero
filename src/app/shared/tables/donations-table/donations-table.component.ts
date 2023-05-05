import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ONLY_NUMBERS_PATTERN } from 'src/app/core/constants';
import { CustomValidators } from 'src/app/core/helpers/custom-validators';
import { Donation } from 'src/app/core/models';

@Component({
  selector: 'app-donations-table',
  templateUrl: './donations-table.component.html',
  styleUrls: ['./donations-table.component.scss'],
})
export class DonationsTableComponent {
  @Input() donations: Donation[] = [];
  @Input() readOnly: boolean | null = false;
  @Output() donationsList = new EventEmitter();
  form: FormGroup;
  donationToEdit!: Donation;
  isEditMode = false;
  closeResult = '';

  constructor(private modalService: NgbModal) {
    this.form = new FormGroup({
      year: new FormControl('', [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.maxLength(4),
        CustomValidators.MaxDate(),
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
      proyectName: new FormControl('', Validators.required),
    });
  }

  addDonation() {
    if (this.form.invalid) return;
    this.donations.push({
      id: uuidv4(),
      ...this.form.value,
    });
    this.donationsList.emit(this.donations);
    this.form.reset();
  }

  removeDonation(id: string) {
    this.donations = this.donations.filter(donation => donation.id !== id);
    this.donationsList.emit(this.donations);
  }

  get f() {
    return this.form.controls;
  }

  loadDonationInFields(id: string, modal: unknown) {
    const donations = this.donations.filter(donation => donation.id === id);
    this.donationToEdit = donations[0];
    const { year, amount, proyectName } = donations[0];
    this.form.setValue({
      year,
      amount,
      proyectName,
    });
    this.isEditMode = true;
    this.open(modal);
  }

  editDonation() {
    this.donationToEdit = { ...this.donationToEdit, ...this.form.value };
    this.donations = this.donations.filter(
      donation => donation.id !== this.donationToEdit.id
    );
    this.donations.push(this.donationToEdit);
    this.donationsList.emit(this.donations);
    this.isEditMode = false;
    this.form.reset();
  }

  cancelEdit() {
    this.isEditMode = false;
    this.form.reset();
  }

  open(content: unknown) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        () => {
          this.form.reset();
        }
      );
  }
}
