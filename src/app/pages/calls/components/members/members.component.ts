import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Member from 'src/app/lib/models/member.model';
import { TableComponent } from 'src/app/lib/models/table.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements TableComponent<Member> {
  @Input() records: Member[] = [];
  @Input() readOnly: boolean | null = false;
  @Output() recordsList = new EventEmitter();
  form: FormGroup;
  validForm = false;
  closeResult = '';
  isEditMode = false;
  recordToEdit: Member;

  constructor(private modalService: NgbModal) {
    this.form = new FormGroup({
      name: new FormControl(''),
      position: new FormControl(''),
    });
    this.form.valueChanges.subscribe((values) => {
      const { name, position } = values;
      if (name || position) {
        this.validForm = this.form.valid && true;
        return;
      }
      this.validForm = false;
    });
  }
  get f() {
    return this.form.controls;
  }

  removeRecord(id: string) {
    this.records = this.records.filter((record) => record.id !== id);
    this.recordsList.emit(this.records);
  }

  loadRecordInFields(id: string, modal: any) {
    const records = this.records.filter((record) => record.id === id);
    this.recordToEdit = records[0];
    const { name, position } = records[0];
    this.form.setValue({
      name,
      position,
    });
    this.isEditMode = true;
    this.open(modal);
  }

  open(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.form.reset();
        }
      );
  }

  addRecord() {
    if (!this.validForm) return;
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
      (record) => record.id !== this.recordToEdit.id
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
