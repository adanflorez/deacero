import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Member from 'src/app/lib/models/member.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  @Input() members: Member[] = [];
  @Output() recordsList = new EventEmitter();
  form: FormGroup;
  validForm = false;
  closeResult = '';
  isEditMode = false;
  memberToEdit: Member;

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

  ngOnInit(): void {}

  removeRecord(id: string) {
    this.members = this.members.filter((member) => member.id !== id);
    this.recordsList.emit(this.members);
  }

  get f() {
    return this.form.controls;
  }

  loadRecordInFields(id: string, modal: any) {
    const members = this.members.filter((member) => member.id === id);
    this.memberToEdit = members[0];
    const { name, position } = members[0];
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
    this.members.push({
      id: uuidv4(),
      ...this.form.value,
    });
    this.recordsList.emit(this.members);
    this.form.reset();
  }

  editRecord() {
    this.memberToEdit = { ...this.memberToEdit, ...this.form.value };
    this.members = this.members.filter(
      (donation) => donation.id !== this.memberToEdit.id
    );
    this.members.push(this.memberToEdit);
    this.recordsList.emit(this.members);
    this.isEditMode = false;
    this.form.reset();
  }

  cancelEdit() {
    this.isEditMode = false;
    this.form.reset();
  }
}
