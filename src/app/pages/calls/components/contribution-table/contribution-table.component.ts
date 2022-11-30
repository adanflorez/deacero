import { TableComponent } from 'src/app/lib/models/table.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectBudget from 'src/app/lib/models/project-budget.model';

@Component({
  selector: 'app-contribution-table',
  templateUrl: './contribution-table.component.html',
  styleUrls: ['./contribution-table.component.scss'],
})
export class ContributionTableComponent
  implements OnInit, TableComponent<ProjectBudget>
{
  @Input() records: any[] = [];
  @Output() onChange: EventEmitter<ProjectBudget[]> = new EventEmitter();
  form: FormGroup<any>;
  validForm: boolean;
  closeResult: string;
  isEditMode: boolean;
  recordToEdit: ProjectBudget;

  constructor(private modalService: NgbModal) {
    this.form = new FormGroup({
      activity: new FormControl(''),
      amount: new FormControl(''),
      expenseType: new FormControl(''),
    });

    this.form.valueChanges.subscribe((values) => {
      const { activity, amount, expenseType } = values;
      if (activity || amount || expenseType) {
        this.validForm = this.form.valid && true;
        return;
      }
      this.validForm = false;
    });
  }

  ngOnInit(): void {}

  get f(): any {
    return this.form.controls;
  }

  addRecord(): void {
    if (!this.validForm) return;
    this.records.push({
      id: uuidv4(),
      ...this.form.value,
    });
    this.onChange.emit(this.records);
    this.form.reset();
  }
  editRecord(...args: any): void {
    this.recordToEdit = { ...this.recordToEdit, ...this.form.value };
    this.records = this.records.filter(
      (record) => record.id !== this.recordToEdit.id
    );
    this.records.push(this.recordToEdit);
    this.onChange.emit(this.records);
    this.isEditMode = false;
    this.form.reset();
  }
  removeRecord(id: string): void {
    this.records = this.records.filter((record) => record.id !== id);
    this.onChange.emit(this.records);
  }

  loadRecordInFields(id: string, modal: any): void {
    const records = this.records.filter((record) => record.id === id);
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

  open(content: any): void {
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

  cancelEdit(): void {
    this.isEditMode = false;
    this.form.reset();
  }
}
