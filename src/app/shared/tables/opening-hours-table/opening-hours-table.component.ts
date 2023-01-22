import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TableComponent } from 'src/app/core/models/table.model';
import { v4 as uuidv4 } from 'uuid';

import { OpeningHours } from './domain';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-opening-hours-table',
  templateUrl: './opening-hours-table.component.html',
  styleUrls: ['./opening-hours-table.component.scss'],
})
export class OpeningHoursTableComponent
  implements TableComponent<OpeningHours>
{
  @Input() records: Array<OpeningHours>;
  @Input() readOnly: boolean | null = false;
  @Output() recordChange: EventEmitter<Array<OpeningHours>> =
    new EventEmitter();
  form: FormGroup<any>;
  validForm: boolean;
  closeResult: string;
  isEditMode: boolean;
  recordToEdit!: OpeningHours;

  constructor(private modalService: NgbModal) {
    this.records = [];
    this.form = new FormGroup({
      day: new FormControl(''),
      entryTime: new FormControl(''),
      departureTime: new FormControl(''),
    });
    this.validForm = false;
    this.closeResult = '';
    this.isEditMode = false;

    this.form.valueChanges.subscribe(values => {
      const { day, entryTime, departureTime } = values;
      if (day && entryTime && departureTime) {
        this.validForm = this.form.valid && true;
        return;
      }
      this.validForm = false;
    });
  }

  addRecord(): void {
    if (!this.validForm) return;
    this.records.push({
      id: uuidv4(),
      ...this.form.value,
    });
    this.recordChange.emit(this.records);
    this.form.reset();
  }

  editRecord(): void {
    this.recordToEdit = { ...this.recordToEdit, ...this.form.value };
    this.records = this.records.filter(
      record => record.id !== this.recordToEdit.id
    );
    this.records.push(this.recordToEdit);
    this.recordChange.emit(this.records);
    this.isEditMode = false;
    this.form.reset();
  }

  removeRecord(id: string): void {
    this.records = this.records.filter(record => record.id !== id);
    this.recordChange.emit(this.records);
  }

  loadRecordInFields(id: string, modal: unknown): void {
    const records = this.records.filter(record => record.id === id);
    this.recordToEdit = records[0];
    const { day, entryTime, departureTime } = records[0];
    this.form.setValue({
      day,
      entryTime,
      departureTime,
    });
    this.isEditMode = true;
    this.open(modal);
  }

  open(content: unknown): void {
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

  cancelEdit(): void {
    this.isEditMode = false;
    this.form.reset();
  }
  get f(): unknown {
    throw new Error('Method not implemented.');
  }
}
