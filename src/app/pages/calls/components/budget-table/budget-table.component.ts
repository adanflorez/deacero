import { TableComponent } from 'src/app/lib/models/table.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ProjectBudget from 'src/app/lib/models/project-budget.model';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss'],
})
export class BudgetTableComponent implements TableComponent<ProjectBudget> {
  @Input() records: ProjectBudget[] = [];
  @Input() readOnly: boolean | null = false;
  @Output() recordChange: EventEmitter<ProjectBudget[]> = new EventEmitter();
  form: FormGroup;
  validForm: boolean;
  closeResult: string;
  isEditMode: boolean;
  recordToEdit!: ProjectBudget;

  constructor(private modalService: NgbModal) {
    this.validForm = false;
    this.closeResult = '';
    this.isEditMode = false;
    this.form = new FormGroup({
      activity: new FormControl(''),
      amount: new FormControl(''),
      expenseType: new FormControl(''),
    });

    this.form.valueChanges.subscribe(values => {
      const { activity, amount, expenseType } = values;
      if (activity || amount || expenseType) {
        this.validForm = this.form.valid && true;
        return;
      }
      this.validForm = false;
    });
  }

  get f(): unknown {
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
    const { activity, amount, expenseType } = records[0];
    this.form.setValue({
      activity,
      amount,
      expenseType,
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
