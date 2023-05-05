import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Remuneration } from 'src/app/core/models';
import { TableComponent } from 'src/app/core/models/table.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-remuneration-table',
  templateUrl: './remuneration-table.component.html',
  styleUrls: ['./remuneration-table.component.scss'],
})
export class RemunerationTableComponent
  implements TableComponent<Remuneration>
{
  @Input() records: Remuneration[] = [];
  @Input() readOnly: boolean | null = false;
  @Output() recordChange: EventEmitter<Remuneration[]> = new EventEmitter();
  form: FormGroup;
  closeResult: string;
  isEditMode: boolean;
  recordToEdit!: Remuneration;

  constructor(private modalService: NgbModal) {
    this.closeResult = '';
    this.isEditMode = false;
    this.form = new FormGroup({
      position: new FormControl('', Validators.required),
      schema: new FormControl('', Validators.required),
      financialRemuneration: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
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
    const { position, schema, financialRemuneration } = records[0];
    this.form.setValue({
      position,
      schema,
      financialRemuneration,
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
}
