import { BehaviorSubject } from 'rxjs';
import { MultimediaService } from './../../../../lib/services/multimedia.service';
import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Product {
  id: string;
  description: string;
  price: string;
  season: string;
  photo: string;
  available: string;
}

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Output() productsList = new EventEmitter();
  form: FormGroup;
  validForm = false;
  productToEdit: Product;
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
      description: new FormControl(''),
      price: new FormControl('', Validators.pattern(ONLY_NUMBERS_PATTERN)),
      available: new FormControl(null),
      season: new FormControl(''),
      photo: new FormControl(''),
    });
    this.form.valueChanges.subscribe((values) => {
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
    this.products = this.products.filter((product) => product.id !== id);
    this.productsList.emit(this.products);
  }

  loadProductInFields(id: string, modal: any) {
    const products = this.products.filter((product) => product.id === id);
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
      (product) => product.id !== this.productToEdit.id
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

  uploadPhoto(e: Event) {
    const formData = new FormData();
    formData.append('file', (e.target as HTMLInputElement).files![0]);
    this.multimediaService.upload(formData).subscribe({
      next: (res) => {
        this.photoUrl.next(res.data);
      },
      error: (error) => console.error(error),
      complete: () => {
        this.photoUrl.asObservable().subscribe((res) => {
          this.f.photo.setValue(res);
        });
      },
    });
  }
}
