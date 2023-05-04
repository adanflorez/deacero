import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ONLY_NUMBERS_PATTERN } from 'src/app/core/constants';
import { Product } from 'src/app/core/models';
import Response from 'src/app/core/models/response.model';
import { MultimediaService } from 'src/app/core/services/multimedia.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() readOnly: boolean | null = false;
  @Output() productsList = new EventEmitter();
  form: FormGroup;
  validForm = false;
  productToEdit!: Product;
  isEditMode = false;
  closeResult = '';
  photoUrl: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);

  constructor(
    private modalService: NgbModal,
    private multimediaService: MultimediaService
  ) {
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      price: new FormControl('', [
        Validators.pattern(ONLY_NUMBERS_PATTERN),
        Validators.required,
      ]),
      available: new FormControl(null, Validators.required),
      season: new FormControl('', Validators.required),
      photo: new FormControl('', Validators.required),
    });
    this.form.valueChanges.subscribe(values => {
      const { description, price, available, season, photo } = values;
      if (description || price || available || season || photo) {
        this.validForm = this.form.valid && true;
        return;
      }
      this.validForm = false;
    });
  }

  addProduct() {
    if (!this.validForm) return;
    this.products.push({
      id: uuidv4(),
      ...this.form.value,
    });
    this.form.reset();
    this.productsList.emit(this.products);
    this.photoUrl.next(undefined);
  }

  removeProduct(id: string) {
    this.products = this.products.filter(product => product.id !== id);
    this.productsList.emit(this.products);
  }

  loadProductInFields(id: string, modal: unknown) {
    const products = this.products.filter(product => product.id === id);
    this.productToEdit = products[0];
    const { description, price, available, season, photo } = products[0];
    this.form.setValue({
      description,
      price,
      available,
      season,
      photo,
    });
    this.isEditMode = true;
    this.open(modal);
  }

  editProduct() {
    this.productToEdit = { ...this.productToEdit, ...this.form.value };
    this.products = this.products.filter(
      product => product.id !== this.productToEdit.id
    );
    this.products.push(this.productToEdit);
    this.productsList.emit(this.products);
    this.isEditMode = false;
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.form.reset();
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

  uploadPhoto(e: Event) {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    formData.append('file', (e.target as HTMLInputElement).files![0]);
    this.multimediaService.upload(formData).subscribe({
      next: (res: unknown) => {
        this.photoUrl.next((res as Response<unknown>).data as string);
      },
      error: error => console.error(error),
      complete: () => {
        this.photoUrl.asObservable().subscribe(res => {
          this.f.photo.setValue(res);
        });
      },
    });
  }
}
