import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from 'src/app/lib/models/table.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Remuneration from 'src/app/lib/models/remuneration.model';
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
  validForm: boolean;
  closeResult: string;
  isEditMode: boolean;
  recordToEdit: Remuneration;

  constructor(private modalService: NgbModal) {
    this.form = new FormGroup({
      position: new FormControl(''),
      schema: new FormControl(''),
      financialRemuneration: new FormControl(''),
    });

    this.form.valueChanges.subscribe(values => {
      const { schema, position, financialRemuneration } = values;
      if (schema || position || financialRemuneration) {
        this.validForm = this.form.valid && true;
        return;
      }
      this.validForm = false;
    });
  }

  get f() {
    return this.form.controls;
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
