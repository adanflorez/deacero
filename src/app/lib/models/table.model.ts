import { FormGroup } from '@angular/forms';

export declare interface TableComponent<T> {
  form: FormGroup;
  validForm: boolean;
  closeResult: string;
  isEditMode: boolean;
  recordToEdit: T;
  addRecord(): void;
  editRecord(...args: any): void;
  removeRecord(...args: any): void;
  loadRecordInFields(...args: any): void;
  open(...args: any): void;
  cancelEdit(...args: any): void;
}
