import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/core/models';
import { TableComponent } from 'src/app/core/models/table.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.scss'],
})
export class MembersTableComponent implements TableComponent<Member> {
  @Input() records: Member[] = [];
  @Input() readOnly: boolean | null = false;
  @Output() recordsList = new EventEmitter();
  form: FormGroup;
  closeResult = '';
  isEditMode = false;
  recordToEdit!: Member;

  constructor(private modalService: NgbModal) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
    });
  }
  get f() {
    return this.form.controls;
  }

  removeRecord(id: string) {
    this.records = this.records.filter(record => record.id !== id);
    this.recordsList.emit(this.records);
  }

  loadRecordInFields(id: string, modal: unknown) {
    const records = this.records.filter(record => record.id === id);
    this.recordToEdit = records[0];
    const { name, position } = records[0];
    this.form.setValue({
      name,
      position,
    });
    this.isEditMode = true;
    this.open(modal);
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

  addRecord() {
    if (this.form.invalid) return;
    this.records.push({
      id: uuidv4(),
      ...this.form.value,
    });
    this.recordsList.emit(this.records);
    this.form.reset();
  }

  editRecord() {
    this.recordToEdit = { ...this.recordToEdit, ...this.form.value };
    this.records = this.records.filter(
      record => record.id !== this.recordToEdit.id
    );
    this.records.push(this.recordToEdit);
    this.recordsList.emit(this.records);
    this.isEditMode = false;
    this.form.reset();
  }

  cancelEdit() {
    this.isEditMode = false;
    this.form.reset();
  }
}
