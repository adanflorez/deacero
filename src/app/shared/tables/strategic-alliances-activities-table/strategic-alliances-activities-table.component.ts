import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StrategicAllianceActivity } from 'src/app/core/models/strategic-alliances-activity.model';
import { TableComponent } from 'src/app/core/models/table.model';

@Component({
  selector: 'app-strategic-alliances-activities-table',
  templateUrl: './strategic-alliances-activities-table.component.html',
  styleUrls: ['./strategic-alliances-activities-table.component.scss'],
})
export class StrategicAlliancesActivitiesTableComponent
  implements TableComponent<StrategicAllianceActivity>
{
  @Input() records: StrategicAllianceActivity[];
  @Input() readOnly: boolean | null;
  @Output() recordChange: EventEmitter<StrategicAllianceActivity[]>;
  form: FormGroup<any>;
  closeResult: string;
  isEditMode: boolean;
  recordToEdit!: StrategicAllianceActivity;

  constructor(private modalService: NgbModal) {
    this.records = [];
    this.readOnly = false;
    this.recordChange = new EventEmitter();
    this.form = new FormGroup({
      activity: new FormControl('', Validators.required),
    });
    this.closeResult = '';
    this.isEditMode = false;
  }

  addRecord(): void {
    if (this.form.invalid) return;
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
    const { activity } = records[0];
    this.form.setValue({
      activity,
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

  get f() {
    return this.form.controls;
  }
}
