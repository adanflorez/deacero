import { FormGroup } from '@angular/forms';

export declare interface TableComponent<T> {
  form: FormGroup;
  validForm: boolean;
  closeResult: string;
  isEditMode: boolean;
  recordToEdit: T;
  addRecord(): void;
  editRecord(...args: unknown[]): void;
  removeRecord(...args: unknown[]): void;
  loadRecordInFields(...args: unknown[]): void;
  open(...args: unknown[]): void;
  cancelEdit(...args: unknown[]): void;
  get f(): unknown;
}
